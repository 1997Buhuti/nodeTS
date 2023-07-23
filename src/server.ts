import * as dotenv from "dotenv";
const result = dotenv.config();
if (result.error) {
  console.log(`Error loading env variables, aborting.`);
  process.exit(1);
}
import "reflect-metadata";
import express from "express";
import { root } from "./routes/root";
import { isInteger } from "./uitls/utils";
import { logger } from "./uitls/logger";
import { AppDataSource } from "./data/data-source";
import { getAllCourses } from "./routes/get-all-courses";
import { defaultErrorHandle } from "./middleware/default-error-handler";
import cors from "cors";
import { getCourseByUrl } from "./routes/get-course-by-Id";
import { FindLessonsForCourse } from "./routes/find-lessons-for-course";
import { UpdateCourse } from "./routes/update-course";
import bodyParser from "body-parser";
import { addCourse } from "./routes/add-course";

const app = express();

function setUpExpress() {
  app.use(cors());

  app.use(bodyParser.json());
  app.route("/").get(root);
  app.route("/courses").get(getAllCourses);
  app.route("/course/:courseUrl").get(getCourseByUrl);
  app.route("/courses/:courseId/lessons").get(FindLessonsForCourse);
  app.route("/courses/:courseId").put(UpdateCourse);
  app.route("/courses/:courseId").put(UpdateCourse);
  app.route("/courses").post(addCourse);
  app.use(defaultErrorHandle);
}

function startServer() {
  const portEnv = process.env.PORT;
  const portArg = process.argv[2];
  let port: number;
  if (isInteger(portEnv)) {
    port = parseInt(portEnv);
  } else if (isInteger(portArg)) {
    port = parseInt(portArg);
  } else {
    port = 9000;
  }
  app.listen(port, () => {
    logger.info(
      `HTTP V2 REST API server is now running on http://localhost:${port}`
    );
  });
}

AppDataSource.initialize()
  .then(() => {
    logger.info(`Data Source Initialized Successfully`);
    setUpExpress();
    startServer();
  })
  .catch((err) => {
    logger.error(`Error during dataSource initialization.`, err);
    process.exit(1);
  });
