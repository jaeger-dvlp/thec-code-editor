import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "@/App";
import LanguageWrapper from "@contexts/LanguageContext";

import "@styles/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <LanguageWrapper>
        <App />
      </LanguageWrapper>
    </Router>
  </React.StrictMode>
);
