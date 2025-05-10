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

//Importing genre related stuff
import ActionMovies from "./Pages/Genres/ActionMovies";
import GenreNav from "./Pages/Genres/GenreNavigation";
import RomanceMovies from "./Pages/Genres/RomanceMovies";
import ComedyMovies from "./Pages/Genres/ComedyMovies";
import HorrorMovies from "./Pages/Genres/HorrorMovies";
import UserDetails from "./Pages/UserDetails";
import { UserProvider } from "./Contexts/UserContext";
import ImageUploader from "./Pages/Random";

function App() {
  const location = useLocation();
  // Fix: Combine all routes where you want to hide the NavBar and GenreNav
  const hideNavbarRoutes = ["/", "/favourites"];

  return (
    <div className="p-2 flex flex-col items-center px-1">
      <ThemeProvider value={theme}>
        <SearchProvider>
          <UserProvider>
            {!hideNavbarRoutes.includes(location.pathname) && (
              <>
                <NavBar className="" />
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
                <Route path="/random" element={<ImageUploader />} />

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
