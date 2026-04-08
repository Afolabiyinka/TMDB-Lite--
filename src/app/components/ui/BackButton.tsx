import { Button } from "@material-tailwind/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(-1)}
      variant="solid"
      isPill
      size="lg"
      color="primary"
      className="mb-6 flex items-center gap-2 text-xl rounded-xl"
    >
      <ArrowLeft
        size={30}
        className="stroke-[1px] hover:group-[]:translate-x-4"
      />
      Back
    </Button>
  );
};

export default BackButton;
