import { Request, Response } from "express";

export const root = (req: Request, res: Response) => {
  res.status(200).send("<h1>Express Server Is Up and Running");
};
