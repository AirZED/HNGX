const path = require("path");
import express, { Request, Response, NextFunction } from "express";
import errorController from "./controllers/errorController";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
const xss = require("xss-clean");
const cors = require("cors");

import AppError from "./utils/appError";
import videoRouter from "./routes/videoRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// mount routers
app.use("/api", videoRouter);

// displays static content from the server
app.use("/uploads", express.static(path.join(__dirname, "./../uploads")));

app.use(cors());
// protection strategies
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

// handle non existent route issue
app.all("*", (req: Request, res: Response, next: NextFunction): void => {
  return next(
    new AppError(`${req.originalUrl} route is not found on this server`, 404)
  );
});

// handle all errors
app.use(errorController.handleErrorResponse);
export default app;
