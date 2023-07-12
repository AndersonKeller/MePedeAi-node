import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TypeProduct } from "./typeProduct.entities";
import { Establish } from "./establish.entities";

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
  @ManyToOne(() => TypeProduct)
  type: TypeProduct;
  @ManyToOne(() => Establish)
  establish: Establish;
}
export { Product };
