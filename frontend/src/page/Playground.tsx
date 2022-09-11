import infoList from "../list";
import "./PlayGround.css";

import { apiUrl } from "../App";
import { nextContent, previousContent } from "../util/contentHandler";

/* eslint-disable-next-line import/no-webpack-loader-syntax */
import Worker from "worker-loader!../util/runtime.worker";

import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Grid,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";

import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

import ansiColor from "ansi-colors";

import Markdown from "markdown-to-jsx";
import axios from "axios";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

interface PlaygroundRouteParams extends Record<string, string | undefined> {
  section: string;
  content: string;
}

function Playground(): JSX.Element {
  const { section, content } = useParams<PlaygroundRouteParams>();

  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState<{
    status: boolean;
    contents?: JSX.Element[];
  }>({
    status: false,
  });
  const [snackbar, setSnackbar] = useState<{
    status: boolean;
    type?: AlertColor;
    msg?: string;
  }>({
    status: false,
    type: "success",
    msg: "",
  });

  const terminal = useRef<Terminal>();

  const workerRef = useRef<Worker>();

  const getPath = (callback: any) => {
    const result = callback(section, content);
    if (result[2]) {
      return "/catalogue";
    } else {
      return `/playground/${result[0]}/${result[1]}`;
    }
  };

  const runCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    terminal.current?.reset();
    setLoading(true);

    axios
      .post(apiUrl + "/compile", {
        code: code,
      })
      .then((resp) => {
        if (resp.data.success) {
          const wasmUrl = apiUrl + `/compiled/${resp.data.wasm_id}.wasm`;
          if (workerRef.current) {
            workerRef.current.postMessage({
              type: "run",
              data: wasmUrl,
            });
          }
        } else {
          let showErrors: JSX.Element[] = [];
          let errors = (resp.data.error as string).split("\n");
          for (let i = 0; i < errors.length - 2; i++) {
            showErrors.push(
              <div className={"codeFont"} key={i}>
                {errors[i]
                  .replaceAll(" ", "\u00A0")
                  .replace(/\/tmp\/\d+.c/, "/tmp/code.c")}
              </div>
            );
            console.log(errors[i]);
          }
          setDialog({
            status: true,
            contents: showErrors,
          });
          setLoading(false);
        }
      })
      .catch(() => {
        setSnackbar({
          status: true,
          type: "error",
          msg: "后端服务器失联，请联系管理员",
        });
      });
  };

  const onEditorChange = (newCode: string) => {
    setCode(newCode);
  };

  useEffect(() => {
    const fetchContent = async (url: string, setter: React.Dispatch<any>) => {
      const value = await fetch(url).then((resp) => resp.text());
      setter(value);
    };

    if (section === undefined || content === undefined) {
      navigate("/404");
      return;
    }

    import(`../document/${section}/${content}.md`).then((article) => {
      fetchContent(article.default, setArticle);
    });
    if (infoList[section].content[content].hasCode) {
      import(`../code/${section}/${content}.c`).then((code) => {
        fetchContent(code.default, setCode);
      });
    } else {
      setCode("");
    }

    terminal.current?.reset();
  }, [content, section, navigate]);

  useEffect(() => {
    const worker = new Worker();

    const mem = new SharedArrayBuffer(20 * 1024 * 1024);
    const stdinBuffer = new Int32Array(mem);
    let stdinPtr = 0;

    worker.postMessage({
      type: "memInit",
      data: mem,
    });

    const wakeupWorker = () => {
      Atomics.store(stdinBuffer, stdinBuffer.length - 1, 1);
      Atomics.notify(stdinBuffer, stdinBuffer.length - 1);
    };

    if (terminal.current === undefined) {
      const term = new Terminal({ cursorBlink: true, cursorStyle: "bar" });
      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(document.getElementById("terminal") as HTMLElement);
      fitAddon.fit();
      console.log(fitAddon);
      terminal.current = term;

      term.onData((e) => {
        switch (e) {
          case "\r": {
            term.write("\r\n");
            stdinBuffer[stdinPtr] = e.charCodeAt(0);
            stdinPtr++;
            Atomics.store(stdinBuffer, stdinBuffer.length - 1, stdinPtr);
            wakeupWorker();
            break;
          }
          case "\u0003": // Ctrl+C
            break;
          case "\u007F": // Backspace (DEL)
            // @ts-ignore
            if (term._core.buffer.x > 0) {
              term.write("\b \b");
              stdinBuffer[stdinPtr] = 0;
              stdinPtr--;
              Atomics.store(stdinBuffer, stdinBuffer.length - 1, stdinPtr);
              worker.postMessage({
                type: "delete",
              });
            }
            break;
          default:
            term.write(e);
            stdinBuffer[stdinPtr] = e.charCodeAt(0);
            //console.log(stdinBuffer);
            stdinPtr++;
        }
      });
    }

    let rflag = false;
    const stdout = (keyCode: number) => {
      if (keyCode === null) {
        terminal.current?.reset();
      }

      let str = String.fromCharCode(keyCode);
      switch (str) {
        case "\n": {
          if (!rflag) {
            str = "\r\n";
            rflag = false;
          }
          break;
        }
        case "\r": {
          rflag = true;
          break;
        }
        default: {
          rflag = false;
        }
      }
      terminal.current?.write(str);
    };

    worker.onmessage = (ev) => {
      let msg: { type: string; data: any } = ev.data;
      switch (msg.type) {
        case "stdout": {
          stdout(msg.data);
          break;
        }
        case "exit": {
          setLoading(false);
          terminal.current?.writeln("");
          if (msg.data === 0) {
            terminal.current?.writeln(
              ansiColor.green.bold(`Exit with ${msg.data}`)
            );
          } else {
            terminal.current?.writeln(
              ansiColor.red.bold(`Exit with ${msg.data}`)
            );
          }
        }
      }
    };

    workerRef.current = worker;
  }, []);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar({ status: false });
  };

  if (
    !section ||
    !content ||
    !(section in infoList) ||
    !(content in infoList[section].content)
  ) {
    return <Navigate to="/404" />;
  }

  return (
    <Fragment>
      <Dialog
        open={dialog.status}
        onClose={() => setDialog({ status: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"编译错误"}</DialogTitle>
        <DialogContent>
          {/*<DialogContentText id="alert-dialog-description">*/}
          {dialog.contents ? dialog.contents.map((e) => e) : ""}
          {/*</DialogContentText>*/}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialog({ status: false })}
            color="primary"
            autoFocus
          >
            关闭
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.status}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={snackbar.type}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
      <main
        style={{
          height: "calc(100vh - 48px)",
        }}
      >
        <Grid
          container
          spacing={2}
          style={{
            height: "100%",
          }}
        >
          <Grid
            item
            xs={6}
            style={{
              maxHeight: "100%",
              paddingTop: "0",
            }}
          >
            <Box className={"cardBox0 scroll"}>
              <Paper
                className={"paper scroll"}
                elevation={2}
                style={{ padding: "16px" }}
              >
                <Typography
                  variant={"h2"}
                  fontWeight={"bold"}
                  fontSize={"24px"}
                >
                  {infoList[section].content[content].title}
                </Typography>
                <Box style={{ marginBottom: "56px" }}>
                  <Markdown options={{ wrapper: "article" }}>
                    {article}
                  </Markdown>
                </Box>
              </Paper>
            </Box>
            <Box className={"buttonBar"}>
              <Button
                variant="outlined"
                color="primary"
                disableElevation
                component={Link}
                to={getPath(previousContent)}
              >
                上一页
              </Button>
              <Button
                variant="outlined"
                color="primary"
                disableElevation
                component={Link}
                to="/catalogue"
              >
                目录
              </Button>
              <Button
                variant="outlined"
                color="primary"
                disableElevation
                component={Link}
                to={getPath(nextContent)}
              >
                下一页
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6} style={{ padding: 0 }}>
            <Box className={"cardBox1"}>
              <Paper
                className={"paper"}
                elevation={2}
                style={{ borderRadius: 0 }}
              >
                <AceEditor
                  style={{
                    width: "100%",
                    height: "100%",
                    fontFamily: "'Consolas', sans-serif",
                  }}
                  mode="c_cpp"
                  theme="github"
                  name="editor"
                  fontSize={16}
                  showPrintMargin={true}
                  showGutter={true}
                  highlightActiveLine={true}
                  value={code}
                  debounceChangePeriod={200}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
                  onChange={onEditorChange}
                />
              </Paper>
              <Box className={"submitButton"}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    float: "right",
                    marginRight: "16px",
                  }}
                  disabled={loading}
                  onClick={runCode}
                >
                  运行
                </Button>
              </Box>
            </Box>
            <Box className={"cardBox2"}>
              <Paper
                className={"paper"}
                elevation={2}
                style={{ borderRadius: 0 }}
              >
                <Box
                  id="terminal"
                  style={{
                    height: "100%",
                    width: "100%",
                    padding: "8px",
                    backgroundColor: "rgb(0, 0, 0)",
                  }}
                />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </main>
    </Fragment>
  );
}

export default Playground;
