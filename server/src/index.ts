import express, { Request, Response } from "express";
import { log } from "./utils/log";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_: Request, res: Response) => {
  res.send("hello");
});

app.listen(4000, () => log.info("server running"));
