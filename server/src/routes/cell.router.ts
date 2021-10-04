import express from "express";
import {
    getCellById,
    getCells,
    createCell,
    // deleteCell,
    updateCell,
} from "../controller/cell.controller";
import { extractJWT } from "../middleware/extractJWT";

const CellRouter = express.Router();

CellRouter.get("/get", extractJWT, getCells);
CellRouter.get("/get/:id", extractJWT, getCellById);
CellRouter.post("/post", extractJWT, createCell);
CellRouter.put("/put/:id", extractJWT, updateCell);
// CellRouter.delete("/delete/:id", extractJWT, deleteCell);

export { CellRouter };
