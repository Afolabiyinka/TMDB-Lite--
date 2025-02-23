import NavBar from "./Pages/NavBar";
import HomePage from "./Pages/HomePage";
import Favourites from "./Pages/Favourites";
import TrendingActors from "./Pages/TrendingActors";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Contexts/ThemeContext";

import Footer from "./Pages/Footer";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/trending-actors" element={<TrendingActors />} />
          {/* <Route path="/auth" element={<Login />} /> */}
        </Routes>
      </ThemeProvider>
      <Footer />
    </>
  );
}

export default App;
