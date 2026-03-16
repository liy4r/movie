import { Router } from "express";
import { getCuisine, getRestaurant } from "../controllers/restaurantController";

const router = Router();

router.get("/", getRestaurant);
router.get("/cuisine", getCuisine);

export default router;
