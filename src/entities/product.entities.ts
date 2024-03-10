import { orderRoutes } from "./../routes/order.routes";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TypeProduct } from "./typeProduct.entities";
import { Establish } from "./establish.entities";
import { OrderProducts } from "./orderProducts.entities";

@Entity("product")
class Product {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 45 })
  name: string;
  @Column()
  description: string;
  @Column({ type: "float" })
  price: number;
  @Column({ length:25})
  quantity: string;
  @ManyToOne(() => TypeProduct)
  type: TypeProduct;
  @ManyToOne(() => Establish)
  establish: Establish;
  @OneToMany(() => OrderProducts, (orderproducts) => orderproducts.product)
  orderProducts: Product[];
}
export { Product };
