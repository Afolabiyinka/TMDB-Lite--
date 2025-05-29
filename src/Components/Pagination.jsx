import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Pagination = ({
  currentPage,
  handlePrevPage,
  handleNextPage,
  maxPages,
}) => {
  return (
    <div className="flex items-center gap-6 justify-center py-4">
      {/* Previous Button */}
      <IconButton
        onClick={handlePrevPage}
        color="secondary"
        variant="outline"
        isCircular
        disabled={currentPage === 1}
        className="disabled:bg-gray-400 px-3 py-1"
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
        isCircular
        disabled={currentPage === maxPages}
        className="disabled:bg-gray-400 px-3 py-1 "
      >
        <ArrowRight className="h-6 w-6" />
      </IconButton>
    </div>
  );
};

export default Pagination;
