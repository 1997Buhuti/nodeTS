import { NextFunction, Request, Response } from "express";
import { logger } from "../uitls/logger";
import { AppDataSource } from "../data/data-source";
import { Course } from "../models/course.model";

export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.debug(`Called get all Courses endpoint`);
    const courseRepository = AppDataSource.getRepository(Course);

    const courses = await courseRepository
      .createQueryBuilder("courses")
      .leftJoinAndSelect("courses.lessons", "LESSONS")
      .orderBy("courses.seqNo")
      .getMany();

    res.status(200).json({ courses });
  } catch (err) {
    logger.error(`Error Calling getAllCourses()`);
    next(err);
  }
};
