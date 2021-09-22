import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { User } from "../model/user.model";
import { omit } from "lodash";
import bcryptjs from "bcryptjs";
import { log } from "../config/logger";
import { config } from "../config/config";

export const getAllUsers = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  User.find()
    .exec()
    .then((result) => {
      return res.status(200).json({
        users: result,
        count: result.length,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export const deleteAllUsers = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  User.deleteMany({})
    .then(() => {
      return res.status(200).send("success");
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export const validateToken = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  log.info("token validated");
  return res.status(200).json({
    message: "authorized",
  });
};

export const handleRegister = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { email, username, password } = req.body;

  bcryptjs.hash(password, config.saltWorkFactor, (hashError, hash) => {
    if (hashError) {
      return res.status(500).json({
        message: hashError.message,
        error: hashError,
      });
    }

    // TODO: insert user into db
  });

  const user = new User({
    _id: new Types.ObjectId(),
    email,
    username,
    password,
  });

  return user
    .save()
    .then((result) => {
      return res.status(201).json({
        user: omit(result.toJSON(), "password"),
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export const handleLogin = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { email, username, password } = req.body;
};
