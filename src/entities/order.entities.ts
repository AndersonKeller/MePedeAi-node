import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./client.entities";
import { Establish } from "./establish.entities";
import { Addresses } from "./address.entities";
import { Menu } from "./menu.entities";
import { Product } from "./product.entities";
import { orderType } from "../schemas/order/order.schemas";
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
