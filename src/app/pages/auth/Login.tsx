import { Mail, Lock, LogIn } from "lucide-react";
import CustomInput from "../../components/custom-input";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/auth/useLogin";

const Login = () => {
  const { handleLogin, loginData, setLoginData } = useLogin();
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
            handleLogin();
          }}
        >
          <CustomInput
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e })}
            id="email"
            placeholder="Email"
            type="email"
            icon={<Mail size={18} />}
          />
          <CustomInput
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e })}
            id="password"
            placeholder="Password"
            type="password"
            icon={<Lock size={18} />}
          />

          <Button isPill type="submit" size="xl">
            <LogIn size={18} className="mr-4" />
            Sign in
          </Button>
        </form>

        {/* Footer */}
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
