import React, { useEffect, useState } from "react";
import { ArrowBigLeft } from "lucide-react";
import { useUser } from "../../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

interface UserSession {
  name: string;
  email: string;
  picture: string;
}

const STORAGE_KEY = "TmdbUser";

const AccountPage: React.FC = () => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        setSession(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse stored user:", error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const handleSignIn = () => {
    if (!user) return;

    const userData: UserSession = {
      name: user.name || "Guest User",
      email: user.email || "guest@example.com",
      picture: user.picture || "https://via.placeholder.com/150",
    };

    setSession(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  };

  const handleSignOut = () => {
    setIsLoading(true);

    // Simulating async logout (replace with actual API call)
    setTimeout(() => {
      localStorage.removeItem(STORAGE_KEY);
      setSession(null);
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {session ? (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm text-center">
          <img
            src={session.picture}
            alt={session.name}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-gray-200"
          />
          <h2 className="text-xl font-semibold text-gray-800">
            {session.name}
          </h2>
          <p className="text-gray-500 mb-6">{session.email}</p>
          <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full"
          >
            <ArrowBigLeft size={18} />
            {isLoading ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm text-center">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Sign in to continue
          </h2>
          <button
            onClick={handleSignIn}
            disabled={!user}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full"
          >
            Sign In
          </button>
          {!user && (
            <p className="text-sm text-gray-500 mt-3">
              Please authenticate first
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountPage;
