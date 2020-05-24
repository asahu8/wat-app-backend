import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity({name: "users"})
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 20)
  username: string;


  @Column()
  @Length(4, 20)
  firstName: string;

  @Column()
  @Length(4, 20)
  lastName: string;

  @Column()
  @Length(4, 20)
  email: string;

  @Column()
  @Length(4, 20)
  dateOfBirth: string;

  @Column()
  @Length(4, 20)
  phoneNumber: string;

  @Column({ default: 0 })
  contributionAmount: number;

  @Column({default: 0 })
  livesUplifted: number;

  @Column({default: 0 })
  fundsLives: number;

  @Column({default: null})
  @Length(4, 30)
  companyName: string;

  @Column({default: null})
  @Length(4, 30)
  designation: string;

  @Column({default: null})
  @Length(4, 20)
  location: string;

  @Column({default: null})
  @Length(4, 20)
  areasOfInterest: string;

  @Column({default: false})
  active: boolean;

  @Column({default: false})
  isAdmin: boolean;

  @Column()
  @Length(4, 100)
  role: string;

  @Column()
  @Length(4, 100)
  password: string;


  @Column({ default: null})
  @Length(4, 100)
  resetPasswordToken: string;

  @Column({default: null})
  @CreateDateColumn()
  resetPasswordSentAt: Date;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;


  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
