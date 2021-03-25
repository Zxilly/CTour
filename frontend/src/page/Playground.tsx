import infoList from "../list";
import { Redirect, useParams } from "react-router-dom";
import { Box, Container, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

require("codemirror/mode/clike/clike");

interface PlaygroundRouteParams {
  section: string;
  content: string;
}

const useStyle = makeStyles({
  container: {
    position: "absolute",
    top: "64px",
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "auto",
  },
  divideBox: {
    height: "100%",
    paddingTop: 0,
  },
  cardBox0: {
    height: "100%",
    width: "100%",
    paddingTop: "16px",
    paddingBottom: "16px",
  },
  cardBox1: {
    height: "70%",
    width: "100%",
    paddingTop: "16px",
    paddingBottom: "8px",
  },
  cardBox2: {
    height: "30%",
    width: "100%",
    paddingTop: "8px",
    paddingBottom: "16px",
  },
  paper: {
    height: "100%",
    width: "100%",
  },
});

/*function useCode(section: string, content: string): string {
  const path = `../code/${section}/${content}.c`;
  const code = require(path);
  console.log(code);
  return "233";
}*/

function Playground(): JSX.Element {
  const { section, content } = useParams<PlaygroundRouteParams>();
  const classes = useStyle();
  const [code, setCode] = useState("");

  useEffect(() => {
    import(`!!raw-loader!../code/${section}/${content}.c`).then((code) => {
      console.log(code.default);
      setCode(code.default);
    });
  }, [content, section]);

  if (!(section in infoList) || !(content in infoList[section].content)) {
    return <Redirect to="/404" />;
  }
  return (
    <Container className={classes.container}>
      <Grid container spacing={2} className={classes.divideBox}>
        <Grid item xs={6} className={classes.divideBox}>
          <Box className={classes.cardBox0}>
            <Paper className={classes.paper} elevation={0}>
              test
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={6} className={classes.divideBox}>
          <Box className={classes.cardBox1}>
            <Paper className={classes.paper} elevation={0}>
              <AceEditor
                mode="c_cpp"
                theme="github"
                name="editor"
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={``}
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
            <Paper className={classes.paper} elevation={0}>
              test
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Playground;
