import { useQuery } from "@tanstack/react-query";
import { getRes, type GetResParams } from "@/services/api";

export const useMovies = (params: GetResParams) =>
  useQuery({
    queryKey: ["movies", params],
    queryFn: () => getRes(params),
  });
