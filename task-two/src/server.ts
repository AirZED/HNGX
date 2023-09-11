import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

import app from "./app";
import db from "./db";
const PORT = process.env.PORT || 3000;

// connect to db
db();

app.listen(PORT, () => {
  console.log(`App has started on port ${PORT}`);
});
