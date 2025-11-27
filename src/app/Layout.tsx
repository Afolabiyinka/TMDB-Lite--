import { ToastContainer } from "react-toastify";
import Footer from "./pages/nav/Footer";
import NavBar from "./pages/nav/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "./hooks/AuthContext";

const Layout = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  useEffect(() => {
    const storedUser = localStorage.getItem("TmdbUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      navigate("/app/movies");
    }
  }, [navigate, setUser]);
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <NavBar />
      <Outlet />
      <Footer />
      <span>
        <ToastContainer
          hideProgressBar
          autoClose={1000}
          theme="colored"
          position="top-center"
        />
      </span>
    </div>
  );
};

export default Layout;
