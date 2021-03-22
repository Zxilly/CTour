import React from "react";
import {AppBar, Toolbar, Typography} from "@material-ui/core";

function CHeader(): JSX.Element {

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    News
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default CHeader