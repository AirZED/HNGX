import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

import app from "./app";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App has started on port ${PORT}`);
});
