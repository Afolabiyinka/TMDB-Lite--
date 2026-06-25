import Footer from "./pages/nav/Footer";
import { Outlet } from "react-router-dom";
import ScrollBtn from "./components/ScrollBtn";
import NavLayout from "./pages/nav/NavLayout";

const Layout = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full min-h-screen relative">
      <NavLayout />
      <div className="pt-24 w-full">
        <Outlet />
      </div>
      <ScrollBtn />
      <Footer />
    </div>
  );
};

export default Layout;
