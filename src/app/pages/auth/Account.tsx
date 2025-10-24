import React, { useEffect, useState } from "react";
import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  picture: string;
}

const AccountPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [storedUser, setStoredUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("TmdbUser");
    if (userData) {
      setStoredUser(JSON.parse(userData));
    } else {
      navigate("/"); // redirect if no user found
    }
  }, [navigate]);

  const handleSignOut = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem("TmdbUser");
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  if (!storedUser) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading user info...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm text-center">
        <img
          src={storedUser.picture}
          alt={storedUser.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-gray-200"
        />
        <h2 className="text-xl font-semibold text-gray-800">
          {storedUser.name}
        </h2>
        <p className="text-gray-500 mb-6">{storedUser.email}</p>
        <button
          onClick={handleSignOut}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          <ArrowBigLeft size={18} />
          {isLoading ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
