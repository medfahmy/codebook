import { Schema, model, Document } from "mongoose";

export type CellType = "markdown" | "javascript";

export interface CellDocument extends Document {
    content: string;
    type: CellType;
}

const CellSchema = new Schema(
    {
        content: { type: String, required: true },
        type: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export const Cell = model<CellDocument>("Cell", CellSchema);
