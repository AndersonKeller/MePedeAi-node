import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order.entities";
import { Product } from "./product.entities";

@Entity("order_products")
class OrderProducts {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "int", default: 1 })
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  order: Order;
  @ManyToOne(() => Product, (product) => product.orderProducts)
  product: Product;
}
export { OrderProducts };
