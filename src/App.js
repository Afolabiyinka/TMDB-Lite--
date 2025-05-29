import { Routes, Route, useLocation } from "react-router-dom";
import { theme, ThemeProvider } from "@material-tailwind/react";

import NavBar from "./Pages/NavBar";
import ScrollBtn from "./Components/ScrollBtn";
import Login from "./Pages/Login";
import HomePage from "./Pages/HomePage";
import Favourites from "./Pages/Favourites";
import TrendingActors from "./Pages/TrendingActors";
import Footer from "./Pages/Footer";
import ComingSoonSection from "./Pages/Coming Soon";

//Importing genre related stuff
import ActionMovies from "./Pages/Genres/ActionMovies";
import RomanceMovies from "./Pages/Genres/RomanceMovies";
import ComedyMovies from "./Pages/Genres/ComedyMovies";
import HorrorMovies from "./Pages/Genres/HorrorMovies";
import UserDetails from "./Pages/UserDetails";
import ImageUploader from "./Pages/Random";
import AccountCustomSlotProps from "./Pages/Account";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/"];

  return (
    <div className="p-2 flex flex-col items-center px-1">
      <ThemeProvider value={theme}>
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
            <Route path="/account" element={<AccountCustomSlotProps />} />
            <Route path="/movies" element={<HomePage />} />
            <Route path="*" element={<ComingSoonSection />} />
            <Route path="/random" element={<ImageUploader />} />

            <Route path="/action" element={<ActionMovies />} />
            <Route path="/romance" element={<RomanceMovies />} />
            <Route path="/comedy" element={<ComedyMovies />} />
            <Route path="/horror" element={<HorrorMovies />} />
          </Routes>
        </div>
        <Footer />
      </ThemeProvider>
      <ScrollBtn />
    </div>
  );
}

export default App;
