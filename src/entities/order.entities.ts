import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("order")
class Order {
  @PrimaryGeneratedColumn("rowid")
  id: number;
  @Column()
  name: string;
}

export { Order };
