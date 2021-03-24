import { Box, Container, Divider, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Catalogue.css";
import { withStyles } from "@material-ui/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import infoList from "../list";
import CPresentationButton from "../component/CPresentationButton";

const useStyles = makeStyles({
  container: {
    margin: "24px auto 36px auto",
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
  }
});

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
  },
})(MuiAccordion);

const AccordionSummary = withStyles({})(MuiAccordionSummary);

const AccordionDetails = withStyles({})(MuiAccordionDetails);

function Catalogue(): JSX.Element {
  const classes = useStyles();

  const welcomeChildren = Object.entries(
    infoList.welcome.content
  ).map((presentationItem) => <CPresentationButton section="welcome" item={presentationItem} key={presentationItem[0]}/>);

  return (
    <Container className={classes.container}>
      <Typography
        variant={"h3"}
        className={[classes.boldFont, classes.bigTitle].join(" ")}
      >
        欢迎使用 C 指南
      </Typography>
      <Typography variant={"h5"} className={classes.boldFont}>
        使用本指南
      </Typography>
      <p>
        欢迎来到 C 编程语言指南。本指南涵盖了该语言的大部分重要特性，主要包括：
      </p>

      <Accordion>
        <AccordionSummary>
          <Box>
            <Typography variant={"h6"} className={classes.sectionTitle}>
              {infoList.welcome.name}
            </Typography>
            <p>{infoList.welcome.description}</p>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Divider className={classes.divider}/>
          {welcomeChildren}
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default Catalogue;
