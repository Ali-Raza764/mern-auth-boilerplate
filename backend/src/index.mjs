import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.mjs";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
// import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["https://mern-auth-react-app.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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

// const __dirname = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
//   });
// }

app.get("/", (req, res) => {
  res.send({
    message: "server is running",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
