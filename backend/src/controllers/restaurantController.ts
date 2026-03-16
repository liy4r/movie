import { Request, Response } from "express";
import Restaurants from "../models/Restaurants";

export const getRestaurant = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 12);
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};

    if (req.query.search) {
      filter.title = { $regex: req.query.search as string, $options: "i" };
    }

    if (req.query.genre) {
      filter.genres = req.query.genre as string;
    }

    const [movies, total] = await Promise.all([
      Restaurants.find(filter)
        .skip(skip)
        .limit(limit)
        .select(
          "title year runtime genres directors cast plot poster rated imdb awards type",
        ),
      Restaurants.countDocuments(filter),
    ]);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      movies,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCuisine = async (req: Request, res: Response) => {
  try {
    const cuisine = await Restaurants.distinct("cuisine");

    res.json(cuisine);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch genres",
    });
  }
};
