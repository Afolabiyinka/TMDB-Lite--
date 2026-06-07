import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";

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
      <IconButton
        onClick={handlePrevPage}
        color="secondary"
        variant="outline"
        isCircular
        size="xl"
        disabled={currentPage === 1}
        className="disabled:bg-gray-400 rounded-3xl"
      >
        <ArrowLeftIcon className="h-6 w-6" />
      </IconButton>

      <Typography className="pointer-events-none" disabled>
        {currentPage}
      </Typography>

      <IconButton
        isCircular
        onClick={handleNextPage}
        color="secondary"
        variant="outline"
        size="xl"
        disabled={currentPage === maxPages}
        className="disabled:bg-gray-400  rounded-3xl "
      >
        <ArrowRightIcon className="h-6 w-6" />
      </IconButton>
    </div>
  );
};

export default Pagination;
