import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "@/services/api";

export const useGenres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: () => fetchGenres(),
  });
