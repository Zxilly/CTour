import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import './App.css'
import CssBaseline from '@material-ui/core/CssBaseline';

import Index from "./page/Index";
import CHeader from "./component/CHeader";
import Catalogue from "./page/Catalogue";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import Playground from "./page/Playground";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#00838f',
        },
        secondary: {
            main: '#039be5',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <CssBaseline/>
                <CHeader/>
                <Switch>
                    <Route exact path="/catalogue">
                        <Catalogue/>
                    </Route>
                    <Route exact path="/">
                        <Index/>
                    </Route>
                    <Route path="/playground/:section/:content">
                        <Playground/>
                    </Route>
                    <Route path="*">

                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
