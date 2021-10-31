import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    return res.status(401).json({ message: 'not authenticated'});
  }

  try {
    const token = authorization.split(" ")[1];
    const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    req.locals.jwt = payload.userId;
    console.log({userId: req.userId});

  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'not authenticated'});
  }

  return next();
}
