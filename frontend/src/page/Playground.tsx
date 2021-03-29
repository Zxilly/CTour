import infoList from "../list";
import "./PlayGround.css";
import useStyles from "../util/style";

import { Redirect, Link, useParams } from "react-router-dom";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import _ from "lodash";

// import initWASM from "../wasm";
import runWASI from "../wasi";

import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

import Markdown from "markdown-to-jsx";
import { previousContent, nextContent } from "../util/contentHandler";
import axios from "axios";
import { apiUrl } from "../App";

interface PlaygroundRouteParams {
  section: string;
  content: string;
}

function Playground(): JSX.Element {
  const { section, content } = useParams<PlaygroundRouteParams>();

  const classes = useStyles();

  const [code, setCode] = useState("");
  const [article, setArticle] = useState("");
  const [output, setOutput] = useState("");

  const getPath = (callback: any) => {
    const result = callback(section, content);
    if (result[2]) {
      return "/catalogue";
    } else {
      return `/playground/${result[0]}/${result[1]}`;
    }
  };

  const outputAppend = (s: number) => {
    const letter = String.fromCharCode(s);
    setOutput((prevState) => prevState + letter);
  };

  const runCode = _.throttle((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setOutput("");

    axios
      .post(apiUrl + "/compile", {
        code: code,
      })
      .then((resp) => {
        if (resp.data.success) {
          const wasmUrl = apiUrl + `/compiled/${resp.data.wasm_id}.wasm`;
          // loadDynamicScript(jsUrl);
          // initWASM(wasmUrl, null, outputAppend, null);
          runWASI(wasmUrl);
        } else {
          //TODO: 编译错误提示
        }
      });
  }, 1000);

  const onChange = (newCode: string) => {
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
              <Markdown options={{ wrapper: "article" }}>{article}</Markdown>
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
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
                onChange={onChange}
              />
            </Paper>
          </Box>
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
          <Box className={classes.cardBox2}>
            <Paper className={classes.paper} elevation={2}>
              {output}
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Playground;
