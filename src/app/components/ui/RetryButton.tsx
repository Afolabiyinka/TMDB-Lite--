import { Button } from "@material-tailwind/react";
import { Loader2 } from "lucide-react";

const RetryButton = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <Button size="xl" className="p-3 px-10" isPill onClick={onRetry}>
      <Loader2 className="mr-2" />
      Retry
    </Button>
  );
};

export default RetryButton;
