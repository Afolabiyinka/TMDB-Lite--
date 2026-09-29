import { IconButton } from "@material-tailwind/react";
import { Heart, X, LockKeyhole, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomBtn from "./ui/CustomBtn";

type LoginModalContext = "favourite" | "account" | "default";

const CONTEXT_COPY: Record<
  LoginModalContext,
  {
    icon: LucideIcon;
    title: string;
    description: string;
  }
> = {
  favourite: {
    icon: Heart,
    title: "Save this movie",
    description:
      "Log in to add this movie to your favourites and keep track of what you love.",
  },
  account: {
    icon: LockKeyhole,
    title: "Log in to continue",
    description:
      "Access your account to view your profile, favourites, and saved lists.",
  },
  default: {
    icon: LockKeyhole,
    title: "Log in required",
    description: "Log in to continue and unlock this feature.",
  },
};

const LoginPopup = ({
  context = "default",
}: {
  context?: LoginModalContext;
}) => {
  const navigate = useNavigate();
  const { icon: Icon, title, description } = CONTEXT_COPY[context];

  const [openModal, setOpenModal] = useState(true);

  const handleLogin = () => {
    setOpenModal(false);
    navigate("/login");
  };
  return (
    <div>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div
            className="
          w-full max-w-md h-[400px]
          overflow-hidden rounded-2xl border border-slate-200/80
          bg-white shadow-2xl shadow-slate-900/15
          dark:border-slate-700/80 dark:bg-slate-900 dark:shadow-black/40
        "
          >
            <div className="relative flex flex-col gap-4 p-6 pb-2">
              {context === "favourite" && (
                <IconButton
                  isCircular
                  color="secondary"
                  size="sm"
                  className="absolute right-4 top-4 border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  onClick={() => setOpenModal(false)}
                >
                  <X size={18} />
                </IconButton>
              )}
              <div className="flex flex-col items-center gap-3 pt-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 ring-1 ring-red-200 dark:bg-red-500/10 dark:ring-red-500/20">
                  <Icon
                    size={26}
                    fill={context === "favourite" ? "red" : "none"}
                    className="stroke-[1.5px] text-red-500 dark:text-red-400"
                  />
                </div>

                <h2 className="text-[26px] leading-[1.1] tracking-wide text-slate-900 dark:text-slate-50">
                  {title}
                </h2>

                <p className="max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {description}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 p-6 pt-5">
              <CustomBtn
                size="lg"
                text="Continue to log in"
                onClick={handleLogin}
                className="w-full"
              />

              <CustomBtn
                variant="solid"
                text="Not now"
                color="secondary"
                className="w-full"
                onClick={() => setOpenModal(false)}
              />

              <p className="pt-1 text-center text-[11px] leading-snug text-slate-500 dark:text-slate-400">
                By continuing, you agree to our Terms of Service
                <br />
                and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPopup;
