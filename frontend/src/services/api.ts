import type { Restaurant, RestaurantResponse } from "@/types/res";

const BASE_URL = "http://localhost:4000/api";

export interface GetResParams {
  page?: number;
  limit?: number;
  search?: string;
  cuisine?: string;
}

export const getRes = async (
  params: GetResParams = {},
): Promise<RestaurantResponse> => {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.search) query.set("search", params.search);
  if (params.cuisine) query.set("cuisine", params.cuisine);

  const res = await fetch(`${BASE_URL}/res?${query}`);
  return res.json();
};

export const getRestaurant = async (id: string): Promise<Restaurant> => {
  const res = await fetch(`${BASE_URL}/res/${id}`, {});
  return res.json();
};
