import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeFather } from "./Contexts/ThemeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="33915265717-slgkk1llr3kvebm9spnfbvv4te8vhk08.apps.googleusercontent.com">
      <BrowserRouter>
        <ThemeFather>
          <App />
        </ThemeFather>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
