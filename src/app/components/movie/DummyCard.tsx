import { Card } from "@material-tailwind/react";

const MovieCardSkeleton = () => {
  return (
    <Card className="overflow-hidden shadow-none relative border-none hover:border rounded-3xl bg-inherit cursor-pointer hover:scale-[1.02] transition-transform duration-300 w-80">
      <div className="flex items-center justify-between absolute top-2 w-full p-1 px-3 z-30">
        <span>
          <div className="h-8 w-16 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
        </span>
        <span>
          <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
        </span>
      </div>

      <div className="h-[21rem] w-full bg-gray-300 dark:bg-gray-700 animate-pulse" />

      <div className="flex justify-between items-center p-2">
        <div className="p-3 flex flex-col items-start gap-2 w-full">
          <div className="h-6 w-3/4 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
          <div className="h-4 w-1/4 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
        </div>
      </div>
    </Card>
  );
};

export default MovieCardSkeleton;
