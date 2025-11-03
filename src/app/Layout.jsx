import { ToastContainer } from "react-toastify";
import Footer from "./pages/nav/Footer";
import NavBar from "./pages/nav/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <NavBar />
      <Outlet />
      <Footer />
      <span>
        <ToastContainer
          hideProgressBar
          autoClose={1000}
          theme="colored"
          position="top-center"

          // style={{
          //   backdropFilter: "blur(10rem)",
          //   borderRadius: "50px",
          //   color: "white",
          //   marginTop: "10px",
          // }}
        />
      </span>
    </div>
  );
};

export default Layout;
