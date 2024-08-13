import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { LinkPrecendence } from "../../config/appConstants";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  phoneNumber: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  linkedId: number;

  @Column({ type: "enum", enum: LinkPrecendence })
  linkPrecedence: LinkPrecendence;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
