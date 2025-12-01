import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, type FC } from "react";

// Importing the hooks and contexts
import { SearchProvider } from "../app/hooks/SearchContext";
import { AuthProvider } from "../app/hooks/AuthContext";
import { FavouritesProvider } from "../app/hooks/useFavourites";
import { GoogleOAuthProvider } from "@react-oauth/google";
//Lazy Loading the pages
const Layout = lazy(() => import("../app/Layout"));
const MoviePage = lazy(() => import("../app/pages/movies/MoviePage"));
const AccountPage = lazy(() => import("../app/pages/auth/Account"));
const Favourites = lazy(() => import("../app/pages/favourites/Favourites"));
const Login = lazy(() => import("../app/pages/auth/Login"));
const HomePage = lazy(() => import("../app/pages/movies/HomePage"));
const TrendingActors = lazy(() => import("../app/pages/TrendingActors"));
const ComingSoonSection = lazy(() => import("../app/pages/Coming Soon"));
const Searchresults = lazy(() => import("../app/pages/search/SearchPage"));

const RoutesConfig: FC = () => {
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
      path: "*",
      Component: ComingSoonSection,
    },

    {
      path: "/",
      Component: () => (
        <SearchProvider>
          <FavouritesProvider>
            <Layout />
          </FavouritesProvider>
        </SearchProvider>
      ),
      children: [
        {
          index: true,
          Component: HomePage,
        },
        {
          path: "movies",
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
          path: "celebrities",
          Component: TrendingActors,
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
