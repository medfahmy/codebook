import express from "express";
import {
    createCell,
    deleteAllCells,
    getAllCells,
    updateCell,
} from "../controller/cell.controller";

const CellRouter = express.Router();

CellRouter.get("/get", getAllCells);
CellRouter.post("/post", createCell);
CellRouter.put("/put", updateCell);
CellRouter.delete("/delete", deleteAllCells);

export { CellRouter };
