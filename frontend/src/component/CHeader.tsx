import React from "react";
import {AppBar, Button, Toolbar, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";

function CHeader(): JSX.Element {
    const history = useHistory();

    function goIndex(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        history.push('/catalogue');
    }

    return (
        <AppBar position="static">
            <Toolbar>
                {/*<a>*/}

                {/*</a>*/}
                <Button onClick={goIndex} color="inherit">
                    <Typography variant="h6">
                        C Tour
                    </Typography>
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default CHeader
