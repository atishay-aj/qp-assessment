import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { GroceryAppDataSource } from "../config/db.config";
import { Grocery } from "../models/grocery.model";
const groceryRepo = GroceryAppDataSource.getRepository(Grocery);
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (email === "admin@gmail.com" && password === "admin") {
      const token = jwt.sign(
        { email, role: "admin", id: 1 },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({ token });
    } else if (email === "user@gmail.com" && password === "user") {
      const token = jwt.sign(
        { email, role: "user", id: 2 },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getGroceries = async (req: Request, res: Response) => {
  try {
    const groceries = await groceryRepo.find();
    res.json(groceries);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
