import Footer from "./pages/nav/Footer";
import NavBar from "./pages/nav/NavBar";
import { Outlet, Navigate } from "react-router-dom";
import ScrollBtn from "./components/ScrollBtn";

const Layout = () => {
  const storedUser = localStorage.getItem("TmdbUser");
  // if (!storedUser) {
  //   return <Navigate to={"/auth/login"} replace />;
  // }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <NavBar />
      <Outlet />
      <ScrollBtn />
      <Footer />
    </div>
  );
};

export default Layout;
