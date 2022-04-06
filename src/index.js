import React from "react";
import ReactDOM from "react-dom";
import { transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import App from "./app";

const options = {
    timeout: 3000,
    offset: '30px',
    transition: transitions.SCALE,
    containerStyle: {
        zIndex: 100,
        textAlign: "right"
    }
};


ReactDOM.render(

    <AlertProvider template={AlertTemplate} {...options}>
        <App />
    </AlertProvider>
    ,
    document.getElementById("root")

);