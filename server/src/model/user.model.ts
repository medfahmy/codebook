import { Schema, model, Document } from "mongoose";
// import bcrypt from "bcrypt";
// import { config } from "../config/config";

export interface UserDocument extends Document {
  email: string;
  username: string;
  password: string;
  // comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// UserSchema.pre("save", async function () {
//   let user = this as UserDocument;

//   //hash the password if it has been modified or is new
//   if (user.isModified("password")) {
//     const salt = await bcrypt.genSalt(config.saltWorkFactor);

//     const hash = await bcrypt.hashSync(user.password, salt);

//     user.password = hash;
//   }
// });

// UserSchema.methods.comparePassword = async function (
//   candidatePassword: string
// ) {
//   const user = this as UserDocument;

//   return bcrypt
//     .compare(candidatePassword, user.password)
//     .catch((_error) => false);
// };

export const User = model<UserDocument>("User", UserSchema);
