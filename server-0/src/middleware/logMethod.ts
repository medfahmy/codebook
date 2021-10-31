import { NextFunction, Request, Response } from "express";
import { log } from "../config/logger";

export const logMethod = (req: Request, res: Response, next: NextFunction) => {
  log.info(
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    log.info(
      `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
    );
  });

  next();
};
