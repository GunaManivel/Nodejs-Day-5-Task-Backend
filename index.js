import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/dbConfig.js";
import userRouter from "./Routers/User.router.js";

dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
connectDB();
app.use("/Users", userRouter);

app.listen(port, () => {
  console.log("Server is running on port : ", port);
});
