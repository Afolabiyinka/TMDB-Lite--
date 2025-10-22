import Footer from "./pages/nav/Footer";
import NavBar from "./pages/nav/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
