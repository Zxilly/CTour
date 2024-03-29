import React from "react";
import {
    BrowserRouter as Router, Navigate,
    Route,
    Routes
} from "react-router-dom";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";

import Index from "./page/Index";
import CHeader from "./component/CHeader";
import Catalogue from "./page/Catalogue";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Playground from "./page/Playground";

let apiUrl:string;

if (process.env.NODE_ENV === "production") {
    apiUrl = "";
} else {
    apiUrl = "http://localhost:8000";
}
export {apiUrl};

const theme = createTheme({
    palette: {
        primary: {
            main: "#00838f",
        },
        secondary: {
            main: "#039be5",
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <CssBaseline/>
                <CHeader/>
                <Routes>
                    <Route path="/catalogue" element={<Catalogue/>}/>
                    <Route path="/" element={<Index/>}/>
                    <Route path="/playground/:section/:content" element={<Playground/>}/>
                    <Route path="/404" element={<h1>404 Not Found</h1>}/>
                    <Route path="*" element={<Navigate to={"/404"} replace/>}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
