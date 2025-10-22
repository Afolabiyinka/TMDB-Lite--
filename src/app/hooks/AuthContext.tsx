import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CredentialResponse } from "@react-oauth/google";

interface User {
  name?: string;
  picture?: string;
  email?: string;
}

interface UserContextType {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  success: (credentials: CredentialResponse) => void;
  error: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<UserContextType | null>(null);

export function AuthProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("TmdbUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const success = (credentials: CredentialResponse) => {
    if (!credentials.credential) return console.error("No credentials found");

    const decodedUser = jwtDecode<User>(credentials.credential);
    setUser(decodedUser);
    localStorage.setItem("TmdbUser", JSON.stringify(decodedUser));
    navigate("/movies");
  };

  const error = () => {
    console.error("Something went wrong with Google Login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, success, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within an AuthProvider");
  }
  return context;
}
