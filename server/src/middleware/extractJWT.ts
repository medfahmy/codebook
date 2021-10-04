import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { log } from "../config/logger";

const { secret } = config.token;

export const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(" ")[1];

    if (token) {
        jwt.verify(token, secret, (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error.message,
                    error,
                });
            } else {
                res.locals.jwt = decoded;
                log.info(decoded as object);
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: "unauthorized",
        });
    }
};
