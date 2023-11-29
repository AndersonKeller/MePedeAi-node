import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Establish } from "./establish.entities";

@Entity("shop")
class Shop {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 52, unique: true })
  url: string;

  @OneToOne(() => Establish)
  @JoinColumn()
  establish: Establish;
}

export { Shop };
