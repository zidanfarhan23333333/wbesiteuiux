import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true,
};

mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb Database Connected");
  } catch (err) {
    console.error("MongoDb Connection Failed", err.message);
    process.exit(1);
  }
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser);

app.use((req, res, next) => {
  console.log(
    `Request Method: ${req.method}, Request URL: ${req.originalUrl} `
  );
  next();
});

app.use("/api/v1/auth", authRoute);

app.listen(port, () => {
  connect();
  console.log(`server listening on port ${port}`);
});
