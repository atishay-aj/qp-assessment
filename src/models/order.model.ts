import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderItem } from "./order_item.model";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number; // Foreign Key to Users table

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[];

  @Column()
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;
}
