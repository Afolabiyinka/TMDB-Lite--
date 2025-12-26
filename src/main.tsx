import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import Loader from "./app/components/Loader";
import App from "./App";

// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Suspense
      fallback={
        <div className="h-screen w-screen flex justify-center items-center">
          <Loader />
        </div>
      }
    >
      <App />
    </Suspense>
  </QueryClientProvider>
);
