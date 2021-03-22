import React from 'react';
import CHeader from "./component/CHeader";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import './App.css'

function App() {
    return (
        <Router>
            <CHeader/>
            <Switch>
                <Route path="/content">

                </Route>
                <Route path="/">

                </Route>
            </Switch>
        </Router>
    );
}

export default App;
