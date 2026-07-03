import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { SpinnerGapIcon } from "@phosphor-icons/react";
import { useGoogleLogin } from "@/app/hooks/auth/useGoogleLogin";

const Login = () => {
  const { handleGoogleLogin, googleLoading } = useGoogleLogin();

  return (
    <div className="h-full w-full flex flex-col justify-center items-center p-4  md:px-8">
      <div className="w-full md:max-w-sm flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to your account to continue
          </p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="w-full pt-2">
            {googleLoading ? (
              <span className="p-3 rounded-full border border-border flex justify-center items-center">
                <SpinnerGapIcon className="animate-spin" />
              </span>
            ) : (
              <GoogleLogin
                shape="pill"
                size="large"
                theme="filled_black"
                text="signin_with"
                onSuccess={(data) => handleGoogleLogin(data)}
              />
            )}
          </div>
        </form>

        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/sign-up" className="font-medium underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
