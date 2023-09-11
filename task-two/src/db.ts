import mongoose, { ConnectOptions } from "mongoose";

const db = async (): Promise<void> => {
  try {
    const DB_URL = process.env.DB_URL?.replace(
      "<PASSWORD>",
      process.env.DB_PASSWORD || ""
    );
    if (!DB_URL) {
      throw new Error("Error with DB connection string");
    }
    await mongoose.connect(DB_URL || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log("Connection to DB successful");
  } catch (error) {
    console.error("The was an error connection to DB", error);
  }
};

export default db;
