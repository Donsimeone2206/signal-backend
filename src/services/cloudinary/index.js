import dotenv from "dotenv";
import {v2} from "cloudinary";
dotenv.config();
const cloudinary = v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: "372693381458894",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
