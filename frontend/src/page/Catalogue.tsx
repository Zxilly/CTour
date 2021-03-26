import { Box, Container, Divider, Typography } from "@material-ui/core";
import React from "react";
import "./Catalogue.css";
import { withStyles } from "@material-ui/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import CPresentationButton from "../component/CPresentationButton";

import infoList from "../list";
import useStyles from "../util/style";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
  },
})(MuiAccordion);

const AccordionSummary = withStyles({})(MuiAccordionSummary);

const AccordionDetails = withStyles({})(MuiAccordionDetails);

function getChildren(section: string) {
  return Object.entries(infoList[section].content).map((presentationItem) => (
    <CPresentationButton
      section={section}
      item={presentationItem}
      key={presentationItem[0]}
    />
  ));
}

function Catalogue(): JSX.Element {
  const classes = useStyles();

  return (
    <Container className={classes.indexContainer}>
      <Typography
        variant={"h3"}
        className={[classes.boldFont, classes.bigTitle].join(" ")}
      >
        欢迎使用 C 指南
      </Typography>
      <Box className={classes.catalogueBox}>
        <Typography variant={"h5"} className={classes.boldFont}>
          使用本指南
        </Typography>
        <p>
          欢迎来到 C
          编程语言指南。本指南涵盖了该语言的大部分重要特性，主要包括：
        </p>
        <Box className={classes.bottomSpace}>
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
              <Divider className={classes.divider} />
              {getChildren("welcome")}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
      <Box className={classes.catalogueBox}>
        <Typography variant={"h5"} className={classes.boldFont}>
          基础
        </Typography>
        <p>
          一开始，将学习关于语言的所有基础内容。
          定义变量、调用函数、以及在你学习下一课之前所需要了解的全部内容。
        </p>
        {["basis", "control", "more"].map((section: string) => (
          <Box className={classes.bottomSpace} key={section}>
            <Accordion>
              <AccordionSummary>
                <Box>
                  <Typography variant={"h6"} className={classes.sectionTitle}>
                    {infoList[section].name}
                  </Typography>
                  <p>{infoList[section].description}</p>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Divider className={classes.divider} />
                {getChildren(section)}
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default Catalogue;
