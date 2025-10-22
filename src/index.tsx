import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RoutesConfig from "./Config/routes-config";

// Get root element and assert it's not null
const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <RoutesConfig />
  </React.StrictMode>
);
