import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Establish } from "./establish.entities";
import { Product } from "./product.entities";

@Entity("menu")
class Menu {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @OneToOne(() => Establish)
  @JoinColumn()
  establish: Establish;
  @ManyToMany(() => Product)
  @JoinTable()
  product: Product[];
}
export { Menu };
