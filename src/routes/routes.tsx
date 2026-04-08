import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

//Auth Routes
const Login = lazy(() => import("../app/pages/auth/Login"));
const AuthLayout = lazy(() => import("../app/pages/auth/AuthLayout"));
const SignUp = lazy(() => import("../app/pages/auth/SignUp"));

//Lazy Loading the pages
const Layout = lazy(() => import("../app/Layout"));
const MoviePage = lazy(() => import("../app/pages/movies/MoviePage"));
const AccountPage = lazy(() => import("../app/pages/user/Account"));
const Favourites = lazy(() => import("../app/pages/favourites/Favourites"));
const HomePage = lazy(() => import("../app/pages/movies/HomePage"));
const Searchresults = lazy(() => import("../app/pages/search/SearchPage"));
const NotFound = lazy(() => import("../app/pages/error/NotFound"));

export const routes: RouteObject[] = [
  {
    path: "*",
    Component: NotFound,
  },
  {
    path: "/",
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
    Component: Layout,
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
        Component: Favourites,
      },
      {
        path: "account",
        Component: AccountPage,
      },
    ],
  },
];
