import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@styles/global.css";

import MainWrapper from "@contexts/MainContext";
import Editor from "./components/views/Editor";
import AlertPopup from "./components/popups/AlertPopup";
import ConfirmPopup from "./components/popups/ConfirmPopup";
import Main from "./components/views/Main";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <MainWrapper>
        <AlertPopup />
        <ConfirmPopup />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
