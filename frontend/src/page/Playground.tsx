import infoList from "../list";
import { Redirect, useParams } from "react-router-dom";
import { Box, Card, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

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
  },
});

function Playground(): JSX.Element {
  const { section, content } = useParams<PlaygroundRouteParams>();
  const classes = useStyle();

  if (!(section in infoList) || !(content in infoList[section].content)) {
    return <Redirect to="/404" />;
  }
  return (
    <Container className={classes.container}>
      <Grid container>
        <Grid item xs={6} className={}>
          <Card />
        </Grid>
        <Grid item xs={6}>
          <Card />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Playground;
