import { NextFunction, Request, Response } from "express";
import { logger } from "../uitls/logger";
import { AppDataSource } from "../data/data-source";
import { Course } from "../models/course.model";
import { Lesson } from "../models/lesson.model";

export const getCourseByUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.debug(`Called get Course by Id endpoint`);
    const courseUrl = req.params.courseUrl;

    if (!courseUrl) {
      const message = `Could not extract course url ${courseUrl}`;
      res.status(404).json({ message });
      throw `Could not extract course url`;
    }

    const courseRepository = AppDataSource.getRepository(Course);
    logger.info(`courseUrl${courseUrl}`);

    const result = await courseRepository.findOneBy({
      url: courseUrl,
    });

    if (!result) {
      throw `Error Couldn't find corresponding course`;
    }
    const totalLessons = await AppDataSource.getRepository(Lesson)
      .createQueryBuilder("lessons")
      .where("lessons.courseId = :courseId", {
        courseId: result.id,
      })
      .getCount();
    res.status(200).json({
      course: result,
      lessonsCount: totalLessons,
    });
  } catch (err) {
    logger.error(`Error Calling getCourseByID()`);
    next(err);
  }
};
