import { ToastContainer } from "react-toastify";
import Footer from "./pages/nav/Footer";
import NavBar from "./pages/nav/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ScrollBtn from "./components/ScrollBtn";

const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("TmdbUser");
    if (!storedUser) {
      navigate("/auth/login");
    }
  }, []);
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <NavBar />
      <Outlet />
      <ScrollBtn />
      <Footer />
      <span>
        <ToastContainer
          hideProgressBar
          autoClose={1000}
          position="top-center"
        />
      </span>
    </div>
  );
};

export default Layout;
