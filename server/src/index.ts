import express from "express";
import { router } from "./router";
import { config } from "./utils/config";
import { log } from "./utils/log";
import mongoose from "mongoose";

const { port, host, mongoURI } = config;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("/", (_: Request, res: Response) => {
//   res.send("hello");
// });

export const connect = () => {
  return mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => log.info("database connected"))
    .catch((err) => {
      log.error("db error", err);
      process.exit(1);
    });
};

app.listen(port, host, () => {
  log.info(`server running at http://${host}:${port}`);
  connect();
  router(app);
});
