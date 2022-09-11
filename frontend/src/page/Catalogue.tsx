import {
    Accordion as MuiAccordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Container,
    Divider,
    styled,
    Typography,
} from "@mui/material";
import React from "react";
import "./Catalogue.css";

import CPresentationButton from "../component/CPresentationButton";

import infoList from "../list";

const Accordion = styled(MuiAccordion)({
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
});

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

    return (
        <Container className={"indexContainer"}>
            <Typography
                variant={"h3"}
                className={"boldFont, bigTitle"}
            >
                欢迎使用 C 指南
            </Typography>
            <Box className={"catalogueBox"}>
                <Typography variant={"h5"} className={"boldFont"}>
                    使用本指南
                </Typography>
                <p>
                    欢迎来到 C
                    编程语言指南。本指南涵盖了该语言的大部分重要特性，主要包括：
                </p>
                <Box className={"bottomSpace"}>
                    <Accordion>
                        <AccordionSummary>
                            <Box>
                                <Typography variant={"h6"} className={"sectionTitle"}>
                                    {infoList.welcome.name}
                                </Typography>
                                <p>{infoList.welcome.description}</p>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider className={"divider"}/>
                            {getChildren("welcome")}
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>
            <Box className={"catalogueBox"}>
                <Typography variant={"h5"} className={"boldFont"}>
                    基础
                </Typography>
                <p>
                    一开始，将学习关于语言的所有基础内容。
                    定义变量、调用函数、以及在你学习下一课之前所需要了解的全部内容。
                </p>
                {["basis", "control", "more"].map((section: string) => (
                    <Box className={"bottomSpace"} key={section}>
                        <Accordion>
                            <AccordionSummary>
                                <Box>
                                    <Typography variant={"h6"} className={"sectionTitle"}>
                                        {infoList[section].name}
                                    </Typography>
                                    <p>{infoList[section].description}</p>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Divider className={"divider"}/>
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
