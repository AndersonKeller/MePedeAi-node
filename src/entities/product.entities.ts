import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TypeProduct } from "./typeProduct.entities";

@Entity("product")
class Product {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 45 })
  name: string;
  @Column()
  description: string;
  @ManyToOne(() => TypeProduct)
  type: TypeProduct;
}
export {Product}