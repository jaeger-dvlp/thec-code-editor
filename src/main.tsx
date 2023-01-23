import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@styles/global.css";
import "react-tooltip/dist/react-tooltip.css";

import Main from "@components/views/Main";
import Loader from "@components/misc/Loader";
import Editor from "@components/views/Editor";
import MainWrapper from "@contexts/MainContext";
import AuthWrapper from "@contexts/AuthContext";
import AlertPopup from "@components/popups/AlertPopup";
import ConfirmPopup from "@components/popups/ConfirmPopup";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthWrapper>
        <MainWrapper>
          <Loader />
          <AlertPopup />
          <ConfirmPopup />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="*" element={<Main />} />
          </Routes>
        </MainWrapper>
      </AuthWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
