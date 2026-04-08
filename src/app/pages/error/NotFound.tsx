import { Typography, Button } from "@material-tailwind/react";
import { ArrowLeft, Frown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen mx-auto flex flex-col items-center justify-center text-center px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Frown className="mx-auto stroke-[0.5px]" size={100} />
        <Typography
          variant="h1"
          className="mt-6 !text-3xl font-bold !leading-snug md:!text-4xl"
        >
          Opps! <br />
          Page not Found!
        </Typography>
        <Typography className="mt-4 mb-10 text-lg text-gray-500 md:max-w-md">
          Don&apos;t worry, our team is already on it. Please refresh the page
          or try again later.
        </Typography>
        <Button isPill size="xl" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-3" />
          Back Home
        </Button>
      </motion.div>
    </div>
  );
}

export default NotFound;
