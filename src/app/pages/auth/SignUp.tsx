import { Link } from "react-router-dom";
import { useGoogleLogin } from "@/app/hooks/auth/useGoogleLogin";
import { GoogleLogin } from "@react-oauth/google";
import { SpinnerGapIcon } from "@phosphor-icons/react";

const SignUp = () => {
  const { handleGoogleLogin, googleLoading } = useGoogleLogin();
  return (
    <div className="h-full w-full flex flex-col justify-center items-center p-4  md:px-8">
      <div className="w-full md:max-w-sm flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Here?</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create an account to continue
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
                text="signup_with"
                onSuccess={(data) => handleGoogleLogin(data)}
              />
            )}
          </div>
        </form>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="font-medium underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
