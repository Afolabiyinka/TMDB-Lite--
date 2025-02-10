import NavBar from "./Pages/NavBar";
import HomePage from "./Pages/HomePage";
import Favourites from "./Pages/Favourites";
import TrendingActors from "./Pages/TrendingActors";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Contexts/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/trending-actors" element={<TrendingActors />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
