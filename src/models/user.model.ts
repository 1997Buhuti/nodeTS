import { Column, Entity, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column("simple-array")
  enrolledCourses: string[];

  @Column({
    type: "varchar",
    length: 500,
    nullable: false,
  })
  @Index()
  Name: string;
}
