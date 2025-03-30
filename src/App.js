import { Routes, Route } from "react-router-dom";
import { theme, ThemeProvider } from "@material-tailwind/react";
import NavBar from "./Pages/NavBar";
import HomePage from "./Pages/HomePage";
import Favourites from "./Pages/Favourites";
import TrendingActors from "./Pages/TrendingActors";
import { SearchProvider } from "./Contexts/SearchContext";
import ErrorSection from "./Pages/NotFound";

function App() {
  return (
    <div className=" p-2 flex flex-col items-center px-1">
      <ThemeProvider value={theme}>
        <SearchProvider>
          <NavBar className="" />
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/celebrities" element={<TrendingActors />} />
              <Route path="*" element={<ErrorSection />} />
            </Routes>
          </div>
        </SearchProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
