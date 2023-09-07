import express from "express";

const app = express();
import getterRouter from "./routes/getterRoute";

app.use("/api/v1/details", getterRouter);

export default app;
