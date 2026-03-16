import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight, Film } from "lucide-react";
import { useMovies } from "@/modules/movies/hooks/useMovies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ResView } from "./ResView";
const MoviesView = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") ?? "",
  );

  const page = Number(searchParams.get("page") ?? "1");
  const search = searchParams.get("search") ?? "";
  const selectedGenre = searchParams.get("genre") ?? "";

  const { data, isLoading, isError, refetch } = useMovies({
    page,
    limit: 20,
    search: search || undefined,
    cuisine: selectedGenre || undefined,
  });

  const movies = data?.restaurant ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  const handleSearch = (e: { preventDefault(): void }) => {
    e.preventDefault();
    setSearchParams({ search: searchInput, page: "1" });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Film size={28} />
        Restaurants
      </h1>

      <form onSubmit={handleSearch} className="flex mb-4 gap-2">
        <Input
          placeholder="Search by name, borough, or cuisine..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button type="submit" disabled={isLoading}>
          <Search size={20} />
        </Button>
      </form>

      {isError && (
        <div className="text-red-500">Failed to load restaurants.</div>
      )}

      {!isLoading && movies.length === 0 && (
        <div>No restaurants found. Try adjusting your search?</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((res) => (
          <ResView
            key={res._id}
            res={res}
            onClick={() => navigate(`/movies/${res._id}`)}
          />
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          disabled={page <= 1}
          onClick={() =>
            setSearchParams({
              search,
              genre: selectedGenre,
              page: String(page - 1),
            })
          }
        >
          <ChevronLeft size={20} />
          Previous
        </Button>
        <span>
          Page {page} of {totalPages} ({total} total)
        </span>
        <Button
          variant="outline"
          disabled={page >= totalPages}
          onClick={() =>
            setSearchParams({
              search,
              genre: selectedGenre,
              page: String(page + 1),
            })
          }
        >
          Next
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export { MoviesView };
