import React from "react";
import Main from "./components/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter } from "react-router-dom";
import Info from "./components/mypage/Info";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </>
    );
};

export default App;
