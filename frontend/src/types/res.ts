export interface Restaurant {
  _id: string;
  name: string;
  borough: string;
  cuisine: string;
  address: {
    building: string;
    street: string;
    zipcode: string;
  };
}

export interface RestaurantResponse {
  restaurant: Restaurant[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
