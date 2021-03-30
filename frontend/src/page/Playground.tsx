import infoList from "../list";
import "./PlayGround.css";
import useStyles from "../util/style";
import runWASI from "../wasi";
import { apiUrl } from "../App";
import { previousContent, nextContent } from "../util/contentHandler";

import { Redirect, Link, useParams } from "react-router-dom";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";

// import initWASM from "../wasm";

import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

import Markdown from "markdown-to-jsx";
import _ from "lodash";
import axios from "axios";

interface PlaygroundRouteParams {
  section: string;
  content: string;
}

function Playground(): JSX.Element {
  const { section, content } = useParams<PlaygroundRouteParams>();

  const classes = useStyles();

  const [code, setCode] = useState("");
  const [article, setArticle] = useState("");
  const terminal = useRef(
    new Terminal({ cursorBlink: true, cursorStyle: "bar" })
  );

  const getPath = (callback: any) => {
    const result = callback(section, content);
    if (result[2]) {
      return "/catalogue";
    } else {
      return `/playground/${result[0]}/${result[1]}`;
    }
  };

  const readFunc = (
    buf: Buffer | Uint8Array,
    off?: number,
    len?: number,
    pos?: number
  ): number => {
    return 0;
  };

  const writeFunc = (
    buf: Buffer,
    off?: number,
    len?: number,
    pos?: number
  ): number => {
    if (!off) {
      off = 0;
    }
    if (!len) {
      len = buf.length;
    }

    // console.log(buf, off, len, pos);

    let tempStr = "";
    for (let i = off; i < len; i++) {
      tempStr += String.fromCharCode(buf[i]);
    }
    // console.log(tempStr);
    // setTerminal((prevState) => prevState + tempStr);
    terminal.current.write(tempStr);
    return len;
  };

  const runCode = _.throttle((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    axios
      .post(apiUrl + "/compile", {
        code: code,
      })
      .then((resp) => {
        if (resp.data.success) {
          const wasmUrl = apiUrl + `/compiled/${resp.data.wasm_id}.wasm`;
          runWASI(wasmUrl, readFunc, writeFunc, () => {
            // terminal.current.clear();
            // terminal.current.clearSelection();
            terminal.current.reset();
          });
        } else {
          //TODO: 编译错误提示
        }
      });
  }, 1000);

  const onEditorChange = (newCode: string) => {
    setCode(newCode);
  };

  useEffect(() => {
    import(`!!raw-loader!../document/${section}/${content}.md`).then(
      (article) => {
        setArticle(article.default);
      }
    );
    if (infoList[section].content[content].hasCode) {
      import(`!!raw-loader!../code/${section}/${content}.c`).then((code) => {
        setCode(code.default);
      });
    } else {
      setCode("");
    }
  }, [content, section]);

  useEffect(() => {
    const term = terminal.current;
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(document.getElementById("terminal") as HTMLElement);
    fitAddon.fit();
  }, []);

  if (!(section in infoList) || !(content in infoList[section].content)) {
    return <Redirect to="/404" />;
  }
  return (
    <Box className={classes.container}>
      <Grid container spacing={2} className={classes.divideBox}>
        <Grid item xs={6} className={classes.divideBox}>
          <Box className={classes.cardBox0}>
            <Paper
              className={[classes.paper, classes.scroll].join(" ")}
              elevation={2}
              style={{ padding: "16px" }}
            >
              <Typography variant={"h2"} fontWeight={"bold"} fontSize={"24px"}>
                {infoList[section].content[content].title}
              </Typography>
              <Box style={{ marginBottom: "56px" }}>
                <Markdown options={{ wrapper: "article" }}>{article}</Markdown>
              </Box>
            </Paper>
          </Box>
          <Box className={classes.buttonBar}>
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
        <Grid item xs={6} className={classes.divideBox}>
          <Box className={classes.cardBox1}>
            <Paper
              className={classes.paper}
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
            <Box className={classes.submitButton}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  float: "right",
                  marginRight: "16px",
                }}
                onClick={runCode}
              >
                运行
              </Button>
            </Box>
          </Box>
          <Box className={classes.cardBox2}>
            <Paper
              className={classes.paper}
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
    </Box>
  );
}

export default Playground;
