import { PlugsIcon, SpinnerGapIcon } from "@phosphor-icons/react";
import CustomBtn from "./CustomBtn";

const ErrorPage = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <div className="flex justify-center items-center flex-col h-full min-h-screen p-10 gap-4 text-center">
      <PlugsIcon className="stroke-[1px] h-40 w-40 animate-pulse text-red-400" />
      <h1 className={`md:text-3xl text-xl font-bold`}>
        O'ops Something went wrong
      </h1>
      {/* <Button size="xl" className="p-3 px-10 rounded-2xl" onClick={onRetry}>
        <SpinnerGapIcon className="mr-2" />
        Retry
      </Button> */}
      <CustomBtn text="Retry" icon={SpinnerGapIcon} onClick={onRetry} />
    </div>
  );
};

export default ErrorPage;
