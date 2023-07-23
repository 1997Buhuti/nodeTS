import { NextFunction, Request, Response } from "express";
import { logger } from "../uitls/logger";
import { AppDataSource } from "../data/data-source";
import { Course } from "../models/course.model";

export const addCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.debug(`Called get Add Course endpoint`);

    const newCourse = req.body;

    if (!newCourse) {
      throw `No new Data available to create`;
    }

    const course = await AppDataSource.manager.transaction(
      "REPEATABLE READ",
      async (transactionalEntityManager) => {
        const repository = transactionalEntityManager.getRepository(Course);
        const result = await repository
          .createQueryBuilder("courses")
          .select("Max(courses.seqNo)", "max")
          .getRawOne();

        const course = repository.create({
          ...newCourse,
          seqNo: (result?.max ?? 0) + 1,
        });

        await repository.save(course);
        return course;
      }
    );
    if (course) {
      res.status(200).json({ course });
    }
    throw `Error Adding a  Course`;
  } catch (err) {
    logger.error(`Error Calling Add Course()`);
    next(err);
  }
};
