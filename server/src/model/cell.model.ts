import { Schema, model, Document, Types } from "mongoose";

export type CellType = "markdown" | "javascript";

export interface CellDocument extends Document {
    content: string;
    type: CellType;
    creator: string;
}

const CellSchema = new Schema(
    {
        content: { type: String, required: true },
        type: { type: String, required: true },
        creaotr: { type: Types.ObjectId, ref: "User" },
    },
    {
        timestamps: true,
    }
);

export const Cell = model<CellDocument>("Cell", CellSchema);
