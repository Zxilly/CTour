import infoList from "../list";
import "./PlayGround.css";
import useStyles from "../util/style";

import { Redirect, useParams } from "react-router-dom";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

import Markdown from "markdown-to-jsx";

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

  useEffect(() => {
    import(`!!raw-loader!../code/${section}/${content}.c`).then((code) => {
      setCode(code.default);
    });
    import(`!!raw-loader!../document/${section}/${content}.md`).then(
      (article) => {
        setArticle(article.default);
      }
    );
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
              />
            </Paper>
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
