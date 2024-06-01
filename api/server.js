import express from "express";
import dotenv from "dotenv";
import redis from "redis";
import { connectToMongoDB } from "./db/config.js";
import cookieParser from "cookie-parser";
import adminAuthRouter from "./routes/admin/auth.admin.router.js";
import adminTaskRouter from "./routes/admin/task.admin.router.js";
import teacherAuthRouter from "./routes/teacher/auth.teacher.router.js"
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT;

const app = express();

export const client = redis.createClient();

client.connect();

client.on("connect", () => {
  console.log("Connected to RedisDB!");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/admin/auth", adminAuthRouter);
app.use("/api/admin/task", adminTaskRouter);
app.use("/api/teacher/auth", teacherAuthRouter);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log("Server is running!");
});
