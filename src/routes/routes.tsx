import { lazy } from "react";

// Importing the hooks and contexts
// import { GoogleOAuthProvider } from "@react-oauth/google";
import type { RouteObject } from "react-router-dom";
import Login from "../app/pages/auth/Login";
import AuthLayout from "../app/pages/auth/AuthLayout";
import SignUp from "../app/pages/auth/SignUp";

//Lazy Loading the pages
const Layout = lazy(() => import("../app/Layout"));
const MoviePage = lazy(() => import("../app/pages/movies/MoviePage"));
const AccountPage = lazy(() => import("../app/pages/user/Account"));
const Favourites = lazy(() => import("../app/pages/favourites/Favourites"));
// const Login = lazy(() => import("../app/pages/user/Login"));
const HomePage = lazy(() => import("../app/pages/movies/HomePage"));
const Searchresults = lazy(() => import("../app/pages/search/SearchPage"));
const ErrorSection = lazy(() => import("../app/pages/error/NotFound"));

export const routes: RouteObject[] = [
  {
    path: "/",
    // index: true,
    Component: AuthLayout,
    children: [
      {
        index: true,
        path: "login",
        Component: Login,
      },
      {
        path: "sign-up",
        Component: SignUp,
      },
    ],
  },
  {
    path: "/",
    Component: () => <Layout />,
    children: [
      {
        index: true,
        Component: HomePage,
      },

      {
        path: "movie/:id",
        index: true,
        Component: MoviePage,
      },
      {
        path: "search",
        Component: Searchresults,
      },
      {
        path: "want-to-watch",
        Component: () => <Favourites />,
      },
      {
        path: "account",
        Component: () => <AccountPage />,
      },

      {
        path: "*",
        Component: ErrorSection,
      },
    ],
  },
];
