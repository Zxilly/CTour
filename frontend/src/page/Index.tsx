import {Button, Container, Typography} from "@mui/material";
import {useNavigate} from 'react-router-dom'
import React from "react";


function Index(): JSX.Element {
    const navigate = useNavigate();

    function goCatalogue(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        navigate('/catalogue');
    }

    return (
        <Container>
            <Typography variant="h1" className={"indexTitle"}>
                C TOUR
            </Typography>
            <Typography variant="h5" className={"content"} style={{marginTop: "40px"}}>
                学习 C 语言的第一步
            </Typography>
            <p style={{width: "100%"}}>
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    style={{marginTop: "40px"}}
                    className={"content"}
                    onClick={goCatalogue}
                >
                    访问目录
                </Button>
            </p>
        </Container>
    )
}

export default Index
