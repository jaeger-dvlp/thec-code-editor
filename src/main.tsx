import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "@/App";

import "@styles/global.css";

import MainWrapper from "@contexts/MainContext";
import Editor from "./components/views/Editor";
import AlertPopup from "./components/popups/AlertPopup";
import ConfirmPopup from "./components/popups/ConfirmPopup";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <MainWrapper>
        <AlertPopup />
        <ConfirmPopup />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="*" element={<App />} />
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
