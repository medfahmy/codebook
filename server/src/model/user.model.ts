import { Schema, model, Document, HookNextFunction } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { config } from "../utils/config";
import { string } from "yup";

export interface UserDocument extends Document {
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next: HookNextFunction) {
  let user = this as UserDocument;

  //hash the password if it has benn modified or is new
  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.saltWorkFactor);

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

export const User = model<UserDocument>("user", UserSchema);
