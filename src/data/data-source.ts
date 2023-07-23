import { DataSource } from "typeorm";
import { Lesson } from "../models/lesson.model";
import { Course } from "../models/course.model";
import * as dotenv from "dotenv";
import { User } from "../models/user.model";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DATABASE_NAME,
  entities: [Course, Lesson, User],
  migrations: ["src/data/migration/**/*.ts"],
  synchronize: false,
  logging: true,
});
