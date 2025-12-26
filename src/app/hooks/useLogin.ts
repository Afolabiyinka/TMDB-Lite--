import type { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";
import { useUserStore } from "../store/userStore";

export const useLogin = () => {
  const { setUser } = useUserStore();

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
    navigate("/");
  };

  const error = () => {
    console.error("Something went wrong with Google Login");
  };

  const logout = () => {
    localStorage.removeItem("TmdbUser");
    setUser(null);
    navigate("/auth/login");
  };
  return { error, success, logout };
};
