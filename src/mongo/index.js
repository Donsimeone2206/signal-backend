import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnect = () => {
  mongoose.connection.once("open", () => console.log("DB connection"));
  return mongoose.connect(
    `${process.env.DB_LINK}`,
    { keepAlive: true }
  );
};

 //export const dbConnect = () => mongoose.connect(process.env.MONGO_URL);
//  module.exports = dbConnect;
