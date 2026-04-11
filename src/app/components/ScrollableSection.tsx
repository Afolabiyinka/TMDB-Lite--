import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollableContainer } from "../hooks/useScroll";

interface Props {
  children: React.ReactNode;
}

const ScrollableCardRow = ({ children }: Props): React.ReactElement => {
  const { scrollContainerRef, showLeftScroll, showRightScroll, scroll } =
    useScrollableContainer();

  return (
    <div className="relative group h-full w-full">
      {showLeftScroll && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 border border-gray-200 opacity-0  transition-opacity duration-200 hover:bg-gray-50"
        >
          <ChevronLeft className="size-5 text-gray-600" />
        </button>
      )}
      {showRightScroll && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 border border-gray-200  transition-opacity duration-200 hover:bg-gray-50"
        >
          <ChevronRight className="size-5 text-gray-600" />
        </button>
      )}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scroll-smooth scrollbar-hide"
        style={{ scrollbarWidth: "thin", msOverflowStyle: "auto" }}
      >
        <div className="flex gap-4 py-4 min-w-min">{children}</div>
      </div>
    </div>
  );
};

export default ScrollableCardRow;
