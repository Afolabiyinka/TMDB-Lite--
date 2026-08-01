import { QueryClient } from "@tanstack/react-query";

const testingEndpoint = "http://localhost:5050/api";
const prodEndpoint = "https://tmdb-lite-backend.onrender.com/api"
const BASE_URL = "https://api.themoviedb.org/3/"

export { testingEndpoint, prodEndpoint, BASE_URL };


export const queryClient = new QueryClient(
   {
      defaultOptions: {
         queries: {
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            staleTime: 1000 * 60 * 2,
            networkMode: "online"
         },
      },
   });