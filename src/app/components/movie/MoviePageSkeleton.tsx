import { motion } from "framer-motion";
import BackButton from "../ui/BackButton";

const MoviePageSkeleton = () => {
  return (
    <motion.div
      className="w-full h-full p-6 md:p-20"
      //   initial={{ y: -50 }}
      //   animate={{ y: 1 }}
      //   transition={{ duration: 0.6 }}
    >
      {/* Back Button */}
      {/* <div className="h-9 w-24 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse mb-6" /> */}
      <BackButton />

      <div className="flex flex-col md:flex-row gap-10 min-h-screen">
        {/* Poster */}
        <div className="w-full md:w-1/3 rounded-xl overflow-hidden">
          <div className="w-full h-[500px] bg-gray-300 dark:bg-gray-700 animate-pulse rounded-xl" />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-6 w-full lg:w-1/2">
          {/* Title */}
          <div className="h-12 w-3/4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md" />

          {/* Genres */}
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-7 w-20 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"
              />
            ))}
          </div>

          {/* Rating + Date chips */}
          <div className="flex gap-4">
            <div className="h-9 w-24 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
            <div className="h-9 w-40 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
          </div>

          {/* Overview */}
          <div className="flex flex-col gap-2">
            <div className="h-5 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md" />
            <div className="h-5 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md" />
            <div className="h-5 w-5/6 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md" />
            <div className="h-5 w-4/6 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-4 w-full p-2">
            <div className="h-14 w-36 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
            <div className="h-14 w-full rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
          </div>

          {/* Cast */}
          <div className="flex flex-col gap-3">
            <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md" />
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 shrink-0"
                >
                  <div className="h-16 w-16 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
                  <div className="h-3 w-14 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md" />
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="flex flex-col gap-3">
            <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md" />
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-48 w-32 shrink-0 rounded-2xl bg-gray-300 dark:bg-gray-700 animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Production Companies */}
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 p-6 mt-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-4">
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MoviePageSkeleton;
