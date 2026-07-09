import CustomError from "@/app/pages/error/CustomErr";
import { lazy, useEffect } from "react";
import { Outlet, useMatches, type RouteObject } from "react-router-dom";

//Auth Routes
const Login = lazy(() => import("../pages/auth/Login"));
const AuthLayout = lazy(() => import("../pages/auth/AuthLayout"));
const SignUp = lazy(() => import("../pages/auth/SignUp"));

//Lazy Loading the pages
const Layout = lazy(() => import("../Layout"));
const MoviePage = lazy(() => import("../pages/movies/MoviePage"));
const AccountPage = lazy(() => import("../pages/user/Account"));
const Favourites = lazy(() => import("../pages/favourites/Favourites"));
const HomePage = lazy(() => import("../pages/movies/HomePage"));
const Searchresults = lazy(() => import("../pages/search/SearchPage"));
const NotFound = lazy(() => import("../pages/error/NotFound"));

const RootWrapper = () => {
  const matches = useMatches();
  useEffect(() => {
    const currentMatch = [...matches]
      .reverse()
      .find((m) => (m.handle as { title?: string })?.title);
    const pageTitle = (currentMatch?.handle as { title?: string })?.title || "";
    document.title = `TMDB Mini | ${pageTitle}`;
  }, [matches]);
  return <Outlet />;
};

export const routes: RouteObject[] = [
  {
    element: <RootWrapper />,
    errorElement: <CustomError />,
    children: [
      {
        path: "*",
        Component: NotFound,
        handle: { title: "Page Not Found" },
      },
      {
        path: "/",
        Component: AuthLayout,
        children: [
          {
            index: true,
            path: "login",
            Component: Login,
            handle: { title: "Login" },
          },
          {
            path: "sign-up",
            Component: SignUp,
            handle: { title: "Sign Up" },
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
            handle: { title: "Home" },
          },
          {
            path: "movie/:id",
            Component: MoviePage,
            handle: { title: "Movie" },
          },
          {
            path: "search",
            Component: Searchresults,
            handle: { title: "Search" },
          },
          {
            path: "want-to-watch",
            Component: Favourites,
            handle: { title: "Want to Watch" },
          },
          {
            path: "account",
            Component: AccountPage,
            handle: { title: "Account" },
          },
        ],
      },
    ],
  },
];
