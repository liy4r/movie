import { Schema, model } from "mongoose";

const addressSchema = new Schema({
  building: { type: String },
  street: { type: String },
  zipcode: { type: String },
});

const restaurantSchema = new Schema(
  {
    name: { type: String },
    address: { type: addressSchema },
    borough: { type: String },
    cuisine: { type: String },
  },
  {
    collection: "restaurants",
  },
);

const Restaurants = model("Restaurants", restaurantSchema);

export default Restaurants;
