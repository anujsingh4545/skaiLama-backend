import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import authRoute from "./routes/authRoute.js";
import projectRoute from "./routes/projectRoute.js";
import { DbConnect } from "./services/DbConnect.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "https://skai-lama-frontend-psi.vercel.app",
  })
);

app.use(express.json());
app.use(cookieParser());

DbConnect();

app.get("/", (req, res) => {
  res.json("hello World");
});

app.use("/api/auth", authRoute);
app.use("/api/project", projectRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Hello from server !", PORT);
});
