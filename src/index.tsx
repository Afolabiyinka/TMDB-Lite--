import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RoutesConfig from "./Config/routes-config";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Get root element and assert it's not null
const rootElement = document.getElementById("root") as HTMLElement;
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RoutesConfig />
    </QueryClientProvider>
  </React.StrictMode>
);
