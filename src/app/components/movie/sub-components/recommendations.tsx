import MovieCard from "../MovieCard";

const Recommendations = ({ recommendations }: any) => {
  return (
    <div>
      <h3 className="text-3xl tracking-wide">More like this</h3>

      <span className="flex w-full gap-5 h-[26rem] overflow-x-auto p-6">
        {recommendations.slice(0, 10).map((rec: any) => (
          <div key={rec.id} className="flex-shrink-0 w-64">
            <MovieCard movie={rec} />
          </div>
        ))}
      </span>
    </div>
  );
};

export default Recommendations;
