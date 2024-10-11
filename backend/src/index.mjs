import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.mjs";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cookieParser());
app.use(express.json());
app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.send({
    message: "server running",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
