import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app.jsx";
import "./stylesheets/components/main/main.scss";
import 'semantic-ui-css/semantic.min.css';
import './stylesheets/components/main/new_loader.scss';
import './stylesheets/components/main/image.scss';

ReactDOM.render(
  <h1>
    <App />
  </h1>,
  document.getElementById("root")
);
