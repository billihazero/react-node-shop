import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";

dotenv.config();

// __dirname 대체 코드
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

await mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("연결완료");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res, next) => {
  setImmediate(() => {
    next(new Error("it is an error"));
  });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send(error.message || "에러가 발생하였습니다");
});

app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.use(express.static(path.join(__dirname, "../uploads")));

app.listen(4000, () => {
  console.log("4000번에서 실행이 되었습니다");
});
