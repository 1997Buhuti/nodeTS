import * as dotenv from "dotenv";

const result = dotenv.config();
import "reflect-metadata";
import { AppDataSource } from "../data/data-source";
import { COURSES } from "../data/db-data";
import { DeepPartial } from "typeorm";
import { Course } from "./course.model";
import { Lesson } from "./lesson.model";

async function populateDb() {
  await AppDataSource.initialize();
  console.log("Database Connection Is Ready");

  const courses = Object.values(COURSES) as DeepPartial<Course>[];

  const courseRepository = AppDataSource.getRepository(Course);
  const lessonsRepository = AppDataSource.getRepository(Lesson);

  for (let courseData of courses) {
    console.log(`Inserting course ${courseData.title}`);

    const course = courseRepository.create(courseData);
    await courseRepository.save(course);

    for (let lessonData of courseData.lessons) {
      console.log(`Inserting course ${lessonData.title}`);

      const lesson = lessonsRepository.create(lessonData);
      lesson.course = course;
      await lessonsRepository.save(lesson);
    }
  }

  const totalCourses = await courseRepository.createQueryBuilder().getCount();
  const totalLessons = await lessonsRepository.createQueryBuilder().getCount();

  console.log(
    `Data Inserted -courses ${totalCourses}, lessons ${totalLessons}`
  );
}

populateDb()
  .then(() => {
    console.log("Finish Populating Database");
    process.exit(0);
  })
  .catch((err) => {
    console.error("error populating database", err);
  });
