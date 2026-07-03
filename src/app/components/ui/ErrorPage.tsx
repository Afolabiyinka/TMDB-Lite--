import { Button } from "@material-tailwind/react";
import { PlugsIcon, SpinnerGapIcon } from "@phosphor-icons/react";

const ErrorPage = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <div className="flex justify-center items-center flex-col h-full min-h-screen p-10 gap-4 text-center">
      <PlugsIcon className="stroke-[1px] h-40 w-40 animate-pulse text-red-500" />
      <h1 className={`md:text-3xl text-xl font-bold`}>
        O'ops Something went wrong
      </h1>
      <Button size="xl" className="p-3 px-10" isPill onClick={onRetry}>
        <SpinnerGapIcon className="mr-2" />
        Retry
      </Button>
    </div>
  );
};

export default ErrorPage;
