import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import studentRouter from "./routes/student.route.js";
import adminRouter from "./routes/admin.route.js";
import courseRouter from "./routes/course.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(8080, () => {
  console.log("Server running at http://localhost:8080/");
});

app.use("/api/auth", authRouter);
app.use("/api/student", studentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/course", courseRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
