import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Grocery } from "./grocery.model";
import { Order } from "./order.model";

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ManyToOne(() => Grocery)
  grocery: Grocery;

  @Column("int")
  quantity: number;

  @Column("decimal")
  price: number; // Store the price at the time of order

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
