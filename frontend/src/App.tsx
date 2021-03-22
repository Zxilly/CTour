import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import './App.css'

import Index from "./page/Index";
import CHeader from "./component/CHeader";


function App() {
    return (
        <Router>
            <CHeader/>
            <Switch>
                <Route path="/catalogue">

                </Route>
                <Route path="/">
                    <Index/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
