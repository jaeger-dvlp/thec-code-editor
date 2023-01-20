import React from "react";
import ReactDOM from "react-dom/client";
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import LanguageWrapper from "./components/context/LanguageContext";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <LanguageWrapper>
        <App />
      </LanguageWrapper>
    </Router>
  </React.StrictMode>
);
