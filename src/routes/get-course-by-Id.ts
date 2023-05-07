import { NextFunction, Request, Response } from "express";
import { logger } from "../uitls/logger";
import { AppDataSource } from "../data/data-source";
import { Course } from "../models/course.model";

export const getCourseByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.debug(`Called get Course by Id endpoint`);
    const courseUrl = req.params.courseUrl;

    const courseRepository = AppDataSource.getRepository(Course);

    const result = await courseRepository.findOneBy({
      url: courseUrl,
    });

    if (!courseUrl) {
      throw `Could not extract course url`;
    }
  } catch (err) {
    logger.error(`Error Calling getCourseByID()`);
    next(err);
  }
};
