import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useUser } from "../Contexts/UserContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const success = (credentials) => {
    const decodedUser = jwtDecode(credentials.credential);
    setUser(decodedUser);
    navigate("/home");
  };

  const error = () => {
    console.log("Something went wrong with Google Login");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="rounded-xl p-10 flex flex-col items-center max-w-md w-full">
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
          🎬 Tmdb Mini
        </h1>
        <p className="mb-6 text-center">
          Get personalized movie recommendations based on your taste.
          <br /> Sign in to unlock the magic 🍿
        </p>

        <GoogleLogin
          onSuccess={success}
          onError={error}
          shape="pill"
          text="signin_with"
          size="large"
        />
      </div>
    </div>
  );
};

export default Login;
