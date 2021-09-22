import express from "express";
import { UserRouter } from "./routes/user.router";
import { config } from "./config/config";
import { log } from "./config/logger";
import { logMethod } from "./middleware/logMethod";
import mongoose from "mongoose";
import cors from "cors";

const { port, host, mongoURI, mongoOptions } = config;

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(logMethod);

// routes
app.use("/api/users", UserRouter);

// database
export const connectDB = () => {
  return mongoose
    .connect(mongoURI, mongoOptions)
    .then(() => log.info("connected to mongodb"))
    .catch((err) => {
      log.error("mongodb error", err);
      process.exit(1);
    });
};

app.listen(port, host, () => {
  log.info(`server running at http://${host}:${port}`);
  connectDB();
});
