import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Establish } from "./establish.entities";

@Entity("type_product")
class TypeProduct {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 45 })
  name: string;
  @Column()
  description: string;
  @ManyToOne(() => Establish)
  establish: Establish;
}
export { TypeProduct };
