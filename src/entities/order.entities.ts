import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { orderType, paymentMethods, statusOrder } from "../schemas/order.schemas";
import { Addresses } from "./address.entities";
import { Client } from "./client.entities";
import { Establish } from "./establish.entities";
import { Menu } from "./menu.entities";
import { OrderProducts } from "./orderProducts.entities";

@Entity("order")
class Order {
  @PrimaryGeneratedColumn("rowid")
  id: number;
  
  @Column({type: "enum", enum: statusOrder})
  status: statusOrder

  @Column({type: "enum", enum: paymentMethods})
  payment: paymentMethods

  @Column({type: "varchar", nullable: true})
  comments: string |null

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date", nullable: true })
  deletedAt: string | null;

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
