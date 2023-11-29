import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { orderType } from "../schemas/order.schemas";
import { Addresses } from "./address.entities";
import { Client } from "./client.entities";
import { Establish } from "./establish.entities";
import { Menu } from "./menu.entities";
import { OrderProducts } from "./orderProducts.entities";

@Entity("order")
class Order {
  @PrimaryGeneratedColumn("rowid")
  id: number;

  @ManyToOne(() => Client)
  @JoinColumn()
  client: Client;

  @ManyToOne(() => Establish)
  @JoinColumn()
  establish: Establish;

  @ManyToOne(() => Addresses)
  @JoinColumn()
  address?: Addresses;

  @ManyToOne(() => Menu)
  @JoinColumn()
  menu: Menu;

  @Column({ type: "float" })
  total: number;

  @Column({ type: "enum", enum: orderType })
  order_type: orderType;

  @OneToMany(() => OrderProducts, (orderproducts) => orderproducts.order)
  orderProducts: OrderProducts[];
}

export { Order };
