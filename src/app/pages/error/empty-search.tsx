import { useSearch } from "@/app/hooks/search/useSearch";
import { SearchSlash } from "lucide-react";
import CustomBtn from "@/app/components/ui/CustomBtn";

export function NoResults() {
  const { setQuery } = useSearch();
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-0 text-center">
      <div className="w-16 h-16 rounded-full border  flex items-center justify-center mb-6">
        <SearchSlash />
      </div>

      <h1 className="font-['Bebas_Neue'] text-5xl font-bold tracking-widest  mb-2">
        No <span className="">Results</span> Found
      </h1>
      <p className="text-sm  tracking-wider font-light mb-8">
        The reel is empty — try a different search
      </p>

      <CustomBtn onClick={() => setQuery("")} size="lg">
        Clear search
      </CustomBtn>
    </div>
  );
}
