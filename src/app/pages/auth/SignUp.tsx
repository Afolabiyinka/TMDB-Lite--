import { Mail, Lock, User, ArrowRight } from "lucide-react";
import CustomInput from "../../components/custom-input";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center p-4  md:px-8">
      <div className="w-full md:max-w-sm flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Here?</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create an account to continue
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4">
          <CustomInput
            id="username"
            placeholder="Username"
            type="text"
            icon={<User size={18} />}
          />
          <CustomInput
            id="email"
            placeholder="Email"
            type="email"
            icon={<Mail size={18} />}
          />
          <CustomInput
            id="password"
            placeholder="Password"
            type="password"
            icon={<Lock size={18} />}
          />

          <Button isPill type="submit" size="xl">
            Create Account
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </form>

        {/* Footer */}
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
