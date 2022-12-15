import http from "http";
import express from "express";
import { ServerSocket } from "./socket";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const application = express();
const mongUrl = process.env.MONGO_URL;
const port = process.env.PORT;

const httpServer = http.createServer(application);
new ServerSocket(httpServer);

mongoose
  .connect(mongUrl ?? "")
  .then((res) => console.log("connected"))
  .catch((e) => console.log(e));

application.use(express.urlencoded({ extended: true }));
application.use(express.json());
application.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

application.get("/ping", (req, res, next) => {
  return res.status(200).json({ hello: "world!" });
});
application.get("/status", (req, res, next) => {
  return res.status(200).json();
});
application.use((req, res, next) => {
  const error = new Error("Not found");
  res.status(404).json({
    message: error.message,
  });
});

/** Listen */
httpServer.listen(port, () => console.info(`Server is running`));

export default application
