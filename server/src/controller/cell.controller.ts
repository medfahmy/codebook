import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { Cell } from "../model/cell.model";
import { log } from "../config/logger";
// import { config } from "../config/config";

export const getAllCells = async (
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    try {
        const cells = await Cell.find().exec();
        return res.status(200).json({
            cells,
            count: cells.length,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error,
        });
    }
};

export const deleteAllCells = async (
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    try {
        await Cell.deleteMany({});
        return res.status(200).json({
            message: "success",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error,
        });
    }
};

// TODO: implement fetching the current user and comparing it with cell creator to allow operations

export const createCell = async (
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    const { content, type } = req.body;

    const _cell = new Cell({
        _id: new Types.ObjectId(),
        content,
        type,
    });

    try {
        const cell = await _cell.save();
        return res.status(201).json(cell);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error,
        });
    }
};

export const updateCell = async (
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    const { id, content } = req.body;

    if (id) {
        try {
            let _cell = await Cell.findOne({ _id: id });
            _cell!.content = content;
            try {
                const cell = await _cell!.save();
                return res.status(200).json(cell);
            } catch (error) {
                log.error(error);
                return res.status(500).json({
                    message: error.message,
                    error,
                });
            }
        } catch (error) {
            log.error(error);
            return res.status(400).json({
                message: "cell not found",
            });
        }
    } else {
        return res.status(400).json({
            message: "field 'id' required",
        });
    }
};
