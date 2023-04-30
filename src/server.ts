import * as dotenv from "dotenv";
const result = dotenv.config();
if (result.error) {
  console.log(`Error loading env variables, aborting.`);
  process.exit(1);
}
import * as express from "express";
import { root } from "./routes/root";
import { isInteger } from "./utils";

const app = express();

function setUpExpress() {
  app.route("/").get(root);
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
    console.log(
      `HTTP V2 REST API server is now running on http://localhost:${port}`
    );
  });
}

setUpExpress();
startServer();
