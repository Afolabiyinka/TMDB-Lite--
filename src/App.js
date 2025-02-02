import NavBar from "./Pages/NavBar";
import HomePage from "./Pages/HomePage";
import Favourites from "./Pages/Favourites";
import TrendingActors from "./Pages/TrendingActors";
import { Routes, Route } from "react-router-dom";

// Import Swiper styles
import "swiper/css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/trending-actors" element={<TrendingActors />} />
      </Routes>
    </>
  );
}

export default App;
