import { Routes, Route } from "react-router-dom";
import { theme, ThemeProvider } from "@material-tailwind/react";
import NavBar from "./Pages/NavBar";
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

function App() {
  return (
    <div className=" p-2 flex flex-col items-center px-1">
      <ThemeProvider value={theme}>
        <SearchProvider>
          <NavBar className="" />
          <div>
            <GenreNav />
          </div>

          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/celebrities" element={<TrendingActors />} />
              <Route path="*" element={<ComingSoonSection />} />
              {/* The routes for the genres */}

              <Route path="/action" element={<ActionMovies />} />
              <Route path="/romance" element={<RomanceMovies />} />
              <Route path="/comedy" element={<ComedyMovies />} />
              <Route path="/horror" element={<HorrorMovies />} />
            </Routes>
          </div>
          <Footer />
        </SearchProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
