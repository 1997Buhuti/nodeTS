import { NextFunction, Request, Response } from "express";
import { logger } from "../uitls/logger";
import { isInteger } from "../uitls/utils";
import { AppDataSource } from "../data/data-source";
import { Course } from "../models/course.model";

export const UpdateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.debug(`Called Update Course endpoint`);
    const courseId = req.params.courseId;
    const changes = req.body;

    if (!isInteger(courseId)) {
      throw `Invalid course id ${courseId}`;
    }

    AppDataSource.createQueryBuilder()
      .update(Course)
      .set(changes)
      .where("id=:courseId", { courseId })
      .execute();
    res
      .status(201)
      .json({ message: `Course ${courseId} was updated successfully` });
  } catch (err) {
    logger.error(`Error Calling getAllCourses()`);
    next(err);
  }
};
