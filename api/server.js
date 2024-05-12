import express from "express"
import dotenv from "dotenv";
import { connectedToMongoDB } from "./db/config.js";
import testRouter from "./routes/test.route.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/api/test", testRouter);

app.listen(PORT, () => {
    connectedToMongoDB();
    console.log("Server is running")
})