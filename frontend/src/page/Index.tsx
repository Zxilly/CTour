import {Button, Container, Typography} from "@material-ui/core";
import {useHistory} from 'react-router-dom'
import React from "react";

import useStyles from "../util/style";


function Index(): JSX.Element {
    const classes = useStyles();
    const history = useHistory();

    function goCatalogue(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        history.push('/catalogue');
    }

    return (
        <Container>
            <Typography variant="h1" className={classes.indexTitle}>
                C TOUR
            </Typography>
            <Typography variant="h5" className={classes.content} style={{marginTop: "40px"}}>
                学习 C 语言的第一步
            </Typography>
            <p style={{width: "100%"}}>
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    style={{marginTop: "40px"}}
                    className={classes.content}
                    onClick={goCatalogue}
                >
                    访问目录
                </Button>
            </p>
        </Container>
    )
}

export default Index
