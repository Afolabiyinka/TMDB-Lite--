import React from "react";
import { ArrowBigLeft } from "lucide-react";
import { useUserStore } from "../../store/userStore";
import { useLogin } from "../../hooks/useLogin";

const AccountPage: React.FC = () => {
  const { user } = useUserStore();
  const { logout } = useLogin();

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading user info...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-4">
      <div className=" shadow-lg rounded-2xl p-6 w-full max-w-sm text-center">
        <img
          src={user.picture}
          alt={user.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2"
        />
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="mb-6">{user.email}</p>
        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          <ArrowBigLeft size={18} />
          Log out
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
