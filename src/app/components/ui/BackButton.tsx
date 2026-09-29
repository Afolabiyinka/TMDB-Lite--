import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomBtn from "./CustomBtn";

const BackButton = ({ whereTo }: { whereTo: "home" | "back" }) => {
  const navigate = useNavigate();
  return (
    <CustomBtn
      onClick={() => (whereTo === "home" ? navigate("/") : navigate(-1))}
      variant="solid"
      size="lg"
      color="primary"
      icon={ArrowLeft}
      className="mb-6 flex items-center gap-2 text-xl rounded-xl"
    >
      Back
    </CustomBtn>
  );
};

export default BackButton;
