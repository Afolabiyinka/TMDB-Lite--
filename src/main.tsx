import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RoutesConfig from "./Config/routes-config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RoutesConfig />
    </QueryClientProvider>
  </StrictMode>
);
