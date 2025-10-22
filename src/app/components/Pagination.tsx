import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  maxPages?: number;
}
const Pagination = ({
  currentPage,
  handlePrevPage,
  handleNextPage,
  maxPages,
}: PaginationProps) => {
  return (
    <div className="flex items-center gap-6 justify-center py-4">
      {/* Previous Button */}
      <IconButton
        onClick={handlePrevPage}
        color="secondary"
        variant="outline"
        // isCircular
        size="xl"
        disabled={currentPage === 1}
        className="disabled:bg-gray-400 px-5 py-1 rounded-3xl"
      >
        <ArrowLeft className="h-6 w-6" />
      </IconButton>

      <Typography className="pointer-events-none" disabled>
        {currentPage}
      </Typography>

      {/* Next Button */}
      <IconButton
        onClick={handleNextPage}
        color="secondary"
        variant="outline"
        // isCircular
        size="xl"
        disabled={currentPage === maxPages}
        className="disabled:bg-gray-400 px-5 py-1 rounded-3xl "
      >
        <ArrowRight className="h-6 w-6" />
      </IconButton>
    </div>
  );
};

export default Pagination;
