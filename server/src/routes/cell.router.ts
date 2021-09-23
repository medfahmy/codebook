import express from "express";
import {
    createCell,
    deleteAllCells,
    getAllCells,
} from "../controller/cell.controller";

const CellRouter = express.Router();

CellRouter.get("/get", getAllCells);
CellRouter.post("/post", createCell);
CellRouter.delete("/delete", deleteAllCells);

export { CellRouter };
