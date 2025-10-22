import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "../app/pages/auth/Login";
import HomePage from "../app/pages/movies/HomePage";
import Favourites from "../app/pages/movies/Favourites";
import ComingSoonSection from "../app/pages/Coming Soon";
import AccountPage from "../app/pages/auth/Account";
import { SearchProvider } from "../app/hooks/SearchContext";
import { AuthProvider } from "../app/hooks/AuthContext";
import { FavouritesProvider } from "../app/hooks/useFavourites";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Layout from "../app/Layout";
import { ThemeFather } from "../app/hooks/ThemeContext";
import React from "react";

const RoutesConfig: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/auth/login",
      index: true,
      Component: () => (
        <GoogleOAuthProvider clientId="33915265717-slgkk1llr3kvebm9spnfbvv4te8vhk08.apps.googleusercontent.com">
          <AuthProvider>
            <Login />
          </AuthProvider>
        </GoogleOAuthProvider>
      ),
    },
    {
      path: "/",
      Component: () => (
        <SearchProvider>
          <ThemeFather>
            <FavouritesProvider>
              <Layout />
            </FavouritesProvider>
          </ThemeFather>
        </SearchProvider>
      ),

      children: [
        {
          path: "movies",
          index: true,
          Component: HomePage,
        },
        {
          path: "favourites",
          Component: () => (
            <FavouritesProvider>
              <Favourites />
            </FavouritesProvider>
          ),
        },
        {
          path: "account",
          Component: () => (
            <AuthProvider>
              <AccountPage />
            </AuthProvider>
          ),
        },
        {
          path: "*",
          Component: ComingSoonSection,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default RoutesConfig;
