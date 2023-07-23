import { NextFunction, Request, Response, request } from "express";
import { logger } from "../uitls/logger";
import { AppDataSource } from "../data/data-source";
import { isInteger } from "../uitls/utils";
import { Lesson } from "../models/lesson.model";

export const FindLessonsForCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.debug(`Called FindLessonsForCourse endpoint`);
    console.log(JSON.stringify(req.params));
    const courseId = req.params.courseId;
    const queryParams = req.query as any;
    const pageSize = queryParams?.pageSize ?? "10";
    const pageNumber = queryParams?.pageNumber ?? "1";

    if (!isInteger(courseId)) {
      throw `Invalid course id ${courseId}`;
    }
    const lessons = await AppDataSource.getRepository(Lesson)
      .createQueryBuilder("lessons")
      .where("lessons.courseId=:courseId", { courseId })
      .orderBy("lessons.seqNo")
      .skip(pageNumber * pageSize)
      .take(pageSize)
      .getMany();

    res.status(200).json({ lessons });
  } catch (err) {
    logger.error(`Error Calling FindLessonsForCourse()`);
    next(err);
  }
};
