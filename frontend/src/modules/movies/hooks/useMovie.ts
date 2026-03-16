import { useQuery } from "@tanstack/react-query";
import { getRestaurant } from "@/services/api";

export const useMovie = (id: string) =>
  useQuery({
    queryKey: ["movie", id],
    queryFn: () => getRestaurant(id),
    enabled: !!id,
  });
