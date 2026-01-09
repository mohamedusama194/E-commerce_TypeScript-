import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 150, unique: true })
  email!: string;

  @Column()
  password!: string;
  
  @Column({ nullable: true })
phone?: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;
}
