import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import Loader from "./app/components/ui/Loader";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <Suspense
        fallback={
          <div className="h-screen w-screen flex justify-center items-center">
            <Loader />
          </div>
        }
      >
        <App />
      </Suspense>
    </GoogleOAuthProvider>
  </QueryClientProvider>,
);
