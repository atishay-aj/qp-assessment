import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
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

  @Column()
  quantity: number;
}
