import { NextFunction, Request, Response } from "express";
import { logger } from "../uitls/logger";

export const defaultErrorHandle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    logger.info(`Getting out from default error handler`);
    return next();
  }

  res.status(500).json({
    status: "500",
    message: `Internal Server Error`,
  });
};
