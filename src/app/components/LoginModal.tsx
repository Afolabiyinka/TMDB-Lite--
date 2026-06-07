import { Button, Dialog, IconButton } from "@material-tailwind/react";
import { Heart, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LoginModal({ open = false, onClose }: { open: boolean, onClose: () => void }) {
  const navigate = useNavigate()
  return (
    <Dialog open={open} size="sm" onOpenChange={onClose}>
      <Dialog.Overlay className="backdrop-blur" />

      <Dialog.Content className="flex flex-col overflow-hidden p-0 rounded-3xl w-[90%]">

        <div className="p-6 pb-2 flex flex-col gap-4">

          <div className="flex justify-end items-center">

            <IconButton isCircular color="secondary" size="lg" onClick={onClose}>
              <X />
            </IconButton>
          </div>

          <h2
            className="text-[32px] leading-[1.1] tracking-wide flex gap-2 items-center"
          >
            <Heart size={30} fill="red" className="stroke-[1px]" color="red" />
            Save this movie
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
            Log in to add this movie to your favourites and keep track of what
            you love.
          </p>
        </div>


        <div className="p-6 pt-5 flex flex-col gap-3">

          <Button
            size="lg"
            isPill
            className="flex items-center justify-center gap-2 w-full"
            onClick={() => navigate("/login")}
          >
            Continue to log in
          </Button>


          <p className="text-[11px] text-gray-400 text-center leading-snug">
            By continuing, you agree to our Terms of Service
            <br />and Privacy Policy.
          </p>
        </div>

      </Dialog.Content>
    </Dialog>
  );
}