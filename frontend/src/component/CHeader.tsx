import React from "react";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

function CHeader(): JSX.Element {
    const navigate = useNavigate();

    function goIndex(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        navigate("/catalogue");
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Button onClick={goIndex} color="inherit">
                    <Typography variant="h6">C Tour</Typography>
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default CHeader
