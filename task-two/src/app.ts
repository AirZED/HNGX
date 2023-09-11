import express, { Request, Response, NextFunction } from "express";
import errorController from "./controllers/errorController";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
const xss = require("xss-clean");

import AppError from "./utils/appError";
import personRouter from "./routes/personRoute";

const app = express();
app.use(express.json());

// mount routers
app.use("/api", personRouter);

// protection strategies
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

// handle non existent route issue
app.all("*", (req: Request, res: Response, next: NextFunction): void => {
  return next(
    new AppError(`${req.originalUrl} us not found on this server`, 404)
  );
});

// handle all errors
app.use(errorController.handleErrorResponse);
export default app;
