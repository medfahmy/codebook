import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { User } from "../model/user.model";
import { omit } from "lodash";
import bcryptjs from "bcryptjs";
import { log } from "../config/logger";
import { config } from "../config/config";
import { signJWT } from "../utils/signJWT";

export const getAllUsers = (
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    User.find()
        .select("-password")
        .exec()
        .then((users) => {
            return res.status(200).json({
                users,
                count: users.length,
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
            return res.status(200).json({
                message: "success",
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error,
            });
        });
};

export const validateToken = (
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    log.info("token validated");
    return res.status(200).json({
        message: "authorized",
    });
};

export const handleRegister = (
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

        const _user = new User({
            _id: new Types.ObjectId(),
            email,
            username,
            password: hash,
        });

        return _user
            .save()
            .then((user) => {
                return res.status(201).json(omit(user.toJSON(), "password"));
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error,
                });
            });
    });
};

export const handleLogin = (
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    const { email, password } = req.body;

    User.find({ email })
        .exec()
        .then((users) => {
            if (users.length !== 1) {
                return res.status(401).json({
                    message: "unauthorized",
                });
            }

            bcryptjs.compare(password, users[0].password, (error, result) => {
                if (error) {
                    log.error(error.message, error);

                    return res.status(401).json({
                        message: "unauthorized",
                    });
                } else if (result) {
                    signJWT(users[0], (_error, token) => {
                        if (_error) {
                            log.error("unable to sign token", error);

                            return res.status(401).json({
                                message: "unauthorized",
                                error: _error,
                            });
                        } else if (token) {
                            return res.status(200).json({
                                message: "auth successful",
                                token,
                                user: omit(users[0].toJSON(), "password"),
                            });
                        }
                    });
                }
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error,
            });
        });
};
