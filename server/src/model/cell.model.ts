import { Schema, model, Document } from "mongoose";

export type CellType = "markdown" | "javascript";

export interface CellDocument extends Document {
  content: string;
  type: CellType;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    content: { type: String, required: true, unique: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

export const Cell = model<CellDocument>("user", UserSchema);
