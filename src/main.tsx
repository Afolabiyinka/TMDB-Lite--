import { createRoot } from "react-dom/client";
import "./index.css";
import RoutesConfig from "./Config/routes-config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import Loader from "./app/components/Loader";

// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Suspense
      fallback={
        <div className="h-screen w-screen">
          <Loader />
        </div>
      }
    >
      <RoutesConfig />
    </Suspense>
  </QueryClientProvider>
);
