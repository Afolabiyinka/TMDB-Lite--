import NavBar from "./Pages/NavBar";
import HomePage from "./Pages/HomePage";
import Favourites from "./Pages/Favourites";
import TrendingActors from "./Pages/TrendingActors";
import { Routes, Route } from "react-router-dom";
import { theme, ThemeProvider } from "@material-tailwind/react";

function App() {
  return (
    <div className="p-2">
      <ThemeProvider value={theme}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/celebrities" element={<TrendingActors />} />
        </Routes>
      </ThemeProvider>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
