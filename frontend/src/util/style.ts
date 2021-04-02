import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  codeFont: {
    fontFamily:
      "'Consolas', 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace",
  },
  submitButton: {
    paddingLeft: "16px",
    position: "relative",
    top: "-56px",
  },
  buttonBar: {
    paddingLeft: "16px",
    paddingRight: "16px",
    position: "relative",
    top: "-56px",
    display: "flex",
    justifyContent: "space-around",
  },
  catalogueBox: {
    margin: "32px 0",
  },
  bottomSpace: {
    margin: "16px 0",
  },
  container: {
    position: "absolute",
    top: "64px",
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "auto",
    paddingRight: "16px",
    paddingLeft: "16px",
  },
  divideBox: {
    height: "100%",
    paddingTop: 0,
  },
  cardBox0: {
    height: "100%",
    width: "100%",
    paddingTop: "16px",
    // paddingBottom: "16px",
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
  },
  paper: {
    height: "100%",
    width: "100%",
  },
  scroll: {
    overflow: "auto",
  },
  indexContainer: {
    margin: "24px auto 80px auto",
    maxWidth: "800px",
    width: "90%",
  },
  boldFont: {
    fontWeight: "bold",
  },
  bigTitle: {
    marginTop: "56px",
    marginBottom: "32px",
  },
  sectionTitle: {
    marginTop: "16px",
    fontWeight: "bold",
  },
  divider: {
    marginBottom: "16px",
  },
  indexTitle: {
    marginTop: "200px",
    textAlign: "center",
    fontWeight: "bold",
    backgroundImage: "linear-gradient(45deg, #00838F 40%, #0040FF 90%)",
    color: "transparent",
    WebkitBackgroundClip: "text",
  },
  content: {
    textAlign: "center",
    marginRight: "auto",
    marginLeft: "auto",
    display: "block",
  },
});

export default useStyles;
