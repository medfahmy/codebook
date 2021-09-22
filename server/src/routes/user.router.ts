import express from "express";
import {
  getAllUsers,
  handleRegister,
  handleLogin,
  deleteAllUsers,
  validateToken,
} from "../controller/user.controller";

const UserRouter = express.Router();

UserRouter.get("/get", getAllUsers);
UserRouter.get("/validate", validateToken);

UserRouter.post("/register", handleRegister);
UserRouter.post("/login", handleLogin);

UserRouter.delete("/delete", deleteAllUsers);

export { UserRouter };
