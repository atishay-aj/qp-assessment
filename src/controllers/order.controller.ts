import { Request, Response } from "express";
import { GroceryAppDataSource } from "../config/db.config";
import { Order } from "../models/order.model";
import { OrderItem } from "../models/order_item.model";
import { Grocery } from "../models/grocery.model";

const orderRepo = GroceryAppDataSource.getRepository(Order);
const orderItemRepo = GroceryAppDataSource.getRepository(OrderItem);
const groceryRepo = GroceryAppDataSource.getRepository(Grocery);

export const placeOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const { orderItems } = req.body; // Array of { groceryId, quantity }
    const userId = (req as any).user.id;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ error: "Order cannot be empty" });
    }

    let totalPrice = 0;
    const orderItemsToSave = [];

    for (const item of orderItems) {
      const grocery = await groceryRepo.findOne({
        where: { id: item.groceryId },
      });
      if (!grocery || grocery.stock < item.quantity) {
        return res
          .status(400)
          .json({ error: `Insufficient stock for ${grocery?.name}` });
      }

      grocery.stock -= item.quantity;
      await groceryRepo.save(grocery);

      const orderItem = orderItemRepo.create({
        grocery,
        quantity: item.quantity,
        price: grocery.price * item.quantity,
      });

      orderItemsToSave.push(orderItem);
      totalPrice += grocery.price * item.quantity;
    }

    const order = orderRepo.create({
      userId: userId,
      orderItems: orderItemsToSave,
      totalPrice,
    });

    await orderRepo.save(order);
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const orders = await orderRepo.find({
      where: { userId: userId },
      relations: ["orderItems", "orderItems.grocery"],
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
