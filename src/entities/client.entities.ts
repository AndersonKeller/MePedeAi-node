import { getRounds, hashSync } from "bcryptjs";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Addresses } from "./address.entities";

@Entity("client")
class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ length: 45 })
  name: string;
  @Column({ length: 12 })
  phone: string;
  @Column({ length: 45, unique: true })
  email: string;

  @Column({ length: 120 })
  password: string;
  @OneToMany(() => Addresses, (addresses) => addresses.client)
  address: Addresses[];

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date", nullable: true })
  deletedAt: string | null;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 9);
    }
  }
}
export { Client };
