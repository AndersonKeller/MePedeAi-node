import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("type_product")
class TypeProduct {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 45 })
  name: string;
  @Column()
  description: string;
}
export { TypeProduct };
