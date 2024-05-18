import express from "express";
import dotenv from "dotenv";
import redis from "redis";
import { connectToMongoDB } from "./db/config.js";
import authRouter from "./routes/auth.router.js";
import cookieParser from "cookie-parser";
dotenv.config();

const PORT = process.env.PORT;

const app = express();

export const client = redis.createClient();

client.connect();

client.on("connect", () => {
  console.log("Connected to RedisDB!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/test", testRouter);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log("Server is running!"); 
});