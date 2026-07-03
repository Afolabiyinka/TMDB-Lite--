import { Button, Dialog, IconButton } from "@material-tailwind/react";
import { Heart, X, LockKeyhole, type LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

export function LoginModal({
  open = false,
  onClose,
  context = "default",
}: {
  open: boolean;
  onClose: () => void;
  context?: LoginModalContext;
}) {
  const navigate = useNavigate();
  const { icon: Icon, title, description } = CONTEXT_COPY[context];

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  return (
    <Dialog open={open} size="sm" onOpenChange={onClose}>
      <Dialog.Overlay className="" />

      <Dialog.Content className="flex flex-col overflow-hidden p-0 rounded-3xl w-[90%]">
        <div className="relative p-6 pb-2 flex flex-col gap-4">
          <IconButton
            isCircular
            color="secondary"
            size="sm"
            className="absolute top-4 right-4"
            onClick={onClose}
          >
            <X size={18} />
          </IconButton>

          <div className="flex flex-col items-center text-center gap-3 pt-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50">
              <Icon
                size={26}
                fill={context === "favourite" ? "red" : "none"}
                className="stroke-[1.5px]"
                color="red"
              />
            </div>

            <h2 className="text-[26px] leading-[1.1] tracking-wide">{title}</h2>

            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              {description}
            </p>
          </div>
        </div>

        <div className="p-6 pt-5 flex flex-col gap-3">
          <Button
            size="lg"
            isPill
            className="flex items-center justify-center gap-2 w-full"
            onClick={handleLogin}
          >
            Continue to log in
          </Button>

          <Button
            size="lg"
            isPill
            variant="ghost"
            color="secondary"
            className="w-full"
            onClick={onClose}
          >
            Not now
          </Button>

          <p className="text-[11px] text-gray-400 text-center leading-snug pt-1">
            By continuing, you agree to our Terms of Service
            <br />
            and Privacy Policy.
          </p>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
