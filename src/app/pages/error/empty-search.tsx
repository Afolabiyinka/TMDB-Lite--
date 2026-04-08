import { useSearchStore } from "@/app/store/searchStore";
import { Button } from "@material-tailwind/react";
import { SearchSlash } from "lucide-react";

export function NoResults() {
  const { setSearchQuery } = useSearchStore();
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-0">
      <div className="w-16 h-16 rounded-full border  flex items-center justify-center mb-6">
        {/* <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#facc15"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="11" x2="14" y2="11" />
          <line x1="11" y1="8" x2="11" y2="14" />
        </svg> */}
        <SearchSlash />
      </div>

      <h1 className="font-['Bebas_Neue'] text-5xl tracking-widest  mb-2">
        No <span className="">Results</span> Found
      </h1>
      <p className="text-sm  tracking-wider font-light mb-8">
        The reel is empty — try a different search
      </p>

      <Button onClick={() => setSearchQuery("")} isPill size="lg">
        Clear search
      </Button>
    </div>
  );
}
