import React, { useEffect } from "react";
import { motion } from "framer-motion";
import tmLogo from "../Assets/the real logo.svg";
import { GoogleLogin } from "@react-oauth/google";
import { useUser } from "../Contexts/UserContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("TmdbUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      navigate("/home");
    }
  }, [navigate, setUser]);

  const success = (credentials) => {
    const decodedUser = jwtDecode(credentials.credential);
    setUser(decodedUser);
    localStorage.setItem("TmdbUser", JSON.stringify(decodedUser));
    navigate("/home");
  };

  const error = () => {
    console.log("Something went wrong with Google Login");
  };

  return (
    <motion.div
      className="w-screen h-screen flex flex-col justify-center items-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="w-full max-w-sm flex flex-col items-center"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Logo and Title Container */}
        <motion.div
          className="flex flex-col items-center justify-center mb-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <img src={tmLogo} alt="Tmdb Mini Logo" className="h-12 mb-2" />
          <h1 className="text-2xl font-extrabold tracking-tight text-center">
            Tmdb Mini
          </h1>
        </motion.div>

        <motion.div
          className="w-16 h-0.5 bg-current rounded-full mb-6 opacity-70"
          initial={{ width: 0 }}
          animate={{ width: "4rem" }}
          transition={{ duration: 0.6, delay: 0.6 }}
        />

        <motion.p
          className="text-center text-base font-medium mb-8 leading-relaxed px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Get personalized 🎬 movie recommendations based on your taste. Sign in
          to unlock the magic 🍿
        </motion.p>

        <motion.div
          className="p-4 rounded-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <GoogleLogin
            onSuccess={success}
            onError={error}
            shape="pill"
            text="signin_with"
            size="large"
          />
        </motion.div>

        <motion.p
          className="mt-6 text-xs opacity-70 text-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.1 }}
        >
          Your movie journey begins with a single click
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
