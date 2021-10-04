import { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
    email: string;
    username: string;
    password: string;
}

const UserSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export const User = model<UserDocument>("User", UserSchema);
