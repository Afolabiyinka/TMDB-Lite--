import React from "react";
import { useUser } from "../Contexts/UserContext";
import { Avatar } from "@material-tailwind/react";

const UserDetails = () => {
  const { user } = useUser();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="rounded-xl p-8 shadow-md flex flex-col items-center max-w-md w-full">
        <div className="mb-6">
          <Avatar
            src={user.picture}
            alt={user.name}
            className="w-24 h-24 border-4 border-opacity-20"
          />
        </div>

        <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
        <p className="text-xl">{user.name}</p>

        <div className="w-full mt-6 pt-6 border-t flex justify-center">
          <p className="italic">Enjoy your experience</p>
        </div>
      </div>

      <p className="mt-8 text-sm">© 2025 Your Company</p>
    </div>
  );
};

export default UserDetails;
