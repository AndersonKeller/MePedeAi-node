import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { stateType } from "../schemas/address/address.schemas";
import { Client } from "./client.entities";

@Entity("addresses")
class Addresses {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ length: 64 })
  street: string;
  @Column()
  city: string;
  @Column({ type: "enum", enum: stateType })
  state: stateType;
  @Column({ length: 9 })
  zipcode: string;
  @Column({ length: 25 })
  number: string;
  @Column({ type: "varchar", nullable: true })
  reference: string | null;
  @OneToMany(() => Client, (client) => client.address)
  client: Client;
}
export { Addresses };
