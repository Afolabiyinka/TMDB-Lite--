import { ToastContainer } from "react-toastify";
import Footer from "./pages/nav/Footer";
import NavBar from "./pages/nav/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
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
