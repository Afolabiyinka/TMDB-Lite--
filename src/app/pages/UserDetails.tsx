import { useNavigate } from "react-router-dom";
import { Avatar, Button } from "@material-tailwind/react";
import { useState } from "react";
import Loader from "../components/Loader";
import { useUserStore } from "../store/userStore";

const UserDetails = () => {
  const { user } = useUserStore();
  const [loggedOut, setLoggedOut] = useState(false);
  const navigate = useNavigate();
  function handleLogOut() {
    setLoggedOut(true);
    setTimeout(() => {
      localStorage.removeItem("TmdbUser");
      navigate("/");
    }, 3000);
  }
  return (
    <div className="w-screen h-screen flex flex-col md:flex-row gap-3 justify-center items-center">
      <div className="rounded-xl p-8  flex flex-col items-center gap-3 max-w-md w-full">
        <div className="mb-6">
          <Avatar
            size="lg"
            shape="circular"
            src={user?.picture}
            alt={user?.name}
            className="w-24 h-24 border-4 border-opacity-20"
          />
        </div>
        <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
        <p className="text-xl">{user?.name}</p>
        <Button
          className="bg-red-500 hover:bg-red-700"
          size="lg"
          isFullWidth
          onClick={handleLogOut}
        >
          {loggedOut ? <Loader /> : " Log Out"}
        </Button>
        <div className="w-full mt-6 pt-6 border-t flex justify-center">
          <p className="italic">Enjoy your experience</p>
        </div>
      </div>
      {/* <div className="md:w-[50%] shadow-xl h-[70%]"></div> */}
    </div>
  );
};

export default UserDetails;
