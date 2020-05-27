import {
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import { Length } from "class-validator";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 50)
  name: string;


  @Column()
  eventDate: string;

  @Column()
  budget: number

  @Column()
  @Length(4, 50)
  items: string;

  @Column()
  @Length(4, 200)
  description: string;

  @Column()
  @Length(4, 30)
  location: string;

  @Column({ default: true})
  active: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
