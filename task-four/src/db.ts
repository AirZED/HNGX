import mongoose from "mongoose";

const db = async (): Promise<void> => {
  try {
    const DB_URL = process.env.DB_URL?.replace(
      "<PASSWORD>",
      process.env.DB_PASS || ""
    );
    if (!DB_URL) {
      throw new Error("Error with DB connection string");
    }
    const options: any = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(DB_URL || "", options);

    console.log("Connection to DB successful");
  } catch (error) {
    console.error("The was an error connection to DB", error);
  }
};

export default db;
