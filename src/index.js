import React from "react";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ProfileDataProvider } from "./contexts/ProfileDataContext";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { ToastContainer } from "react-toastify";
import appStyles from "./App.module.css";

ReactDOM.render(
    // <React.StrictMode>
        <Router>
            <CurrentUserProvider>
                <ProfileDataProvider>
                    <ToastContainer theme="dark" />
                    <App />
                </ProfileDataProvider>
            </CurrentUserProvider>
        </Router>
    // </React.StrictMode>
    ,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
