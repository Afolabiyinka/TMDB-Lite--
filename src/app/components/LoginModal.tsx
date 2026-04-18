import { Button, Dialog, IconButton } from "@material-tailwind/react";
import { Heart, LogIn, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LoginModal({ open = false, onClose }: { open: boolean, onClose: () => void }) {
  const navigate = useNavigate()
  return (
    <Dialog open={open} size="sm" onOpenChange={onClose}>
      <Dialog.Overlay className="backdrop-blur" />

      <Dialog.Content className="flex flex-col overflow-hidden p-0 rounded-3xl">

        {/* Top */}
        <div className="p-6 pb-2 flex flex-col gap-4">

          {/* Badge */}
          <div className="flex justify-between items-center">
            <span className="inline-flex items-center gap-1.5 self-start text-[11px] font-medium tracking-widest uppercase text-gray-500 border border-gray-200 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              Action required
            </span>
            <IconButton isCircular variant="outline" onClick={onClose}>
              <X />
            </IconButton>
          </div>

          {/* Heading */}
          <h2
            className="text-[32px] leading-[1.1] tracking-wide flex gap-2 items-center"
          // style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <Heart size={30} fill="red" className="stroke-[1px]" />
            Save this movie
          </h2>

          {/* Text */}
          <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
            Log in to add this movie to your favourites and keep track of what
            you love.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mt-4" />

        {/* Bottom */}
        <div className="p-6 pt-5 flex flex-col gap-3">

          <Button
            size="lg"
            isPill
            className="flex items-center justify-center gap-2 w-full"
            onClick={() => navigate("/login")}
          >
            Continue to log in
          </Button>

          <button className="text-sm text-gray-500 hover:text-gray-700 transition" onClick={() => navigate("/signup")}
          >
            Create an account
          </button>

          <p className="text-[11px] text-gray-400 text-center leading-snug">
            By continuing, you agree to our Terms of Service
            <br />and Privacy Policy.
          </p>
        </div>

      </Dialog.Content>
    </Dialog>
  );
}