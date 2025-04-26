import { Routes, Route, useLocation } from "react-router-dom";
import { theme, ThemeProvider } from "@material-tailwind/react";

import NavBar from "./Pages/NavBar";
import ScrollBtn from "./Components/ScrollBtn";
import Login from "./Pages/Login";
import HomePage from "./Pages/HomePage";
import Favourites from "./Pages/Favourites";
import TrendingActors from "./Pages/TrendingActors";
import { SearchProvider } from "./Contexts/SearchContext";
import Footer from "./Pages/Footer";
import ComingSoonSection from "./Pages/Coming Soon";

//Importin genre related stuff
import ActionMovies from "./Pages/Genres/ActionMovies";
import GenreNav from "./Pages/Genres/GenreNavigation";
import RomanceMovies from "./Pages/Genres/RomanceMovies";
import ComedyMovies from "./Pages/Genres/ComedyMovies";
import HorrorMovies from "./Pages/Genres/HorrorMovies";
import UserDetails from "./Pages/UserDetails";
import { UserProvider } from "./Contexts/UserContext";

function App() {
  const location = useLocation();
  const hideNavbaRoute = ["/", "/favourites", "/account"];

  return (
    <div className=" p-2 flex flex-col items-center px-1">
      <ThemeProvider value={theme}>
        <SearchProvider>
          <UserProvider>
            {!hideNavbaRoute.includes(location.pathname) && (
              <>
                <NavBar className="" />
                <div>
                  <GenreNav />
                </div>
              </>
            )}
            <div>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/celebrities" element={<TrendingActors />} />
                <Route path="/account" element={<UserDetails />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="*" element={<ComingSoonSection />} />

                <Route path="/action" element={<ActionMovies />} />
                <Route path="/romance" element={<RomanceMovies />} />
                <Route path="/comedy" element={<ComedyMovies />} />
                <Route path="/horror" element={<HorrorMovies />} />
              </Routes>
            </div>
            <Footer />
          </UserProvider>
        </SearchProvider>
      </ThemeProvider>
      <ScrollBtn />
    </div>
  );
}

export default App;
