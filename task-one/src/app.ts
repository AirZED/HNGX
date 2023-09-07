import express from "express";

const app = express();
import getterRouter from "./routes/getterRoute";

app.use("/api", getterRouter);

export default app;
