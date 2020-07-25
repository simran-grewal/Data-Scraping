import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import "./stylesheets/components/main/main.css";
import "./stylesheets/components/main/loader.css";
import 'semantic-ui-css/semantic.min.css';
ReactDOM.render(
  <h1>
    <App />
  </h1>,
  document.getElementById("root")
);
