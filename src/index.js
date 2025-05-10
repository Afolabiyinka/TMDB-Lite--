import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { ThemeFather } from "./Contexts/ThemeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FavouritesProvider } from "./Contexts/MovieContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="33915265717-slgkk1llr3kvebm9spnfbvv4te8vhk08.apps.googleusercontent.com">
      <BrowserRouter>
        <ThemeFather>
          <FavouritesProvider>
            <App />
          </FavouritesProvider>
        </ThemeFather>
      </BrowserRouter>
    </GoogleOAuthProvider>
    =======
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
