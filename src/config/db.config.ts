import { DataSource } from "typeorm";
import { Grocery } from "../models/grocery.model";
import { Order } from "../models/order.model";
import { OrderItem } from "../models/order_item.model";

export const GroceryAppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER ?? "admin",
  password: process.env.DB_PASSWORD ?? "password",
  database: process.env.DB_NAME ?? "grocery_db",
  synchronize: true,
  entities: [Grocery, Order, OrderItem],
});
