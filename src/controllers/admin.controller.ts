import { Request, Response } from "express";
import { GroceryAppDataSource } from "../config/db.config";
import { Grocery } from "../models/grocery.model";

const groceryRepo = GroceryAppDataSource.getRepository(Grocery);

export const addGrocery = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;
    const grocery = groceryRepo.create({ name, price, stock });
    await groceryRepo.save(grocery);
    res.status(201).json(grocery);
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

export const getGrocery = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const grocery = await groceryRepo.findOne({ where: { id } });
    if (!grocery) {
      return res.status(404).json({ error: "Grocery not found" });
    }
    res.json(grocery);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateGrocery = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = Number(req.params.id);
    const { name, price, stock } = req.body;
    const grocery = await groceryRepo.findOne({ where: { id } });
    if (!grocery) {
      return res.status(404).json({ error: "Grocery not found" });
    }
    grocery.name = name;
    grocery.price = price;
    grocery.stock = stock;
    await groceryRepo.save(grocery);
    res.json(grocery);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteGrocery = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = Number(req.params.id);
    const grocery = await groceryRepo.findOne({ where: { id } });
    if (!grocery) {
      return res.status(404).json({ error: "Grocery not found" });
    }
    await groceryRepo.remove(grocery);
    res.json({ message: "Grocery deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
