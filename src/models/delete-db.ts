import * as dotenv from "dotenv";

const result = dotenv.config();
import "reflect-metadata";
import { AppDataSource } from "../data/data-source";
import { Course } from "./course.model";
import { Lesson } from "./lesson.model";

async function deleteDb() {
  await AppDataSource.initialize();
  console.log("Database Connection Is Ready");

  console.log("Deleting all Lessons from the Database");
  await AppDataSource.getRepository(Lesson).delete({});
  console.log("Deleting all Courses from the Database");
  await AppDataSource.getRepository(Course).delete({});
}

deleteDb()
  .then(() => {
    console.log("Finish Deleting all Database records");
    process.exit(0);
  })
  .catch((err) => {
    console.error("error Deleting all Database records", err);
  });
