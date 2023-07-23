import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { AppDataSource } from "../data-source";
import { Course } from "../../models/course.model";
import { COURSES } from "../db-data";
import { DeepPartial } from "typeorm";

export default class CourseSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
  ): Promise<any> {
    console.log("Database Connection Is Ready");

    const courses = Object.values(COURSES) as DeepPartial<Course>[];

    const courseRepository = AppDataSource.getRepository(Course);

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
    const totalLessons = await lessonsRepository
      .createQueryBuilder()
      .getCount();

    console.log(
      `Data Inserted -courses ${totalCourses}, lessons ${totalLessons}`
    );
  }
}
