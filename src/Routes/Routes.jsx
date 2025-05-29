import { Routes, Route, Switch } from "react-router-dom";
const Routes = () => {
  return (
    <div>
      <Switch>
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
      </Switch>
    </div>
  );
};

export default Routes;
