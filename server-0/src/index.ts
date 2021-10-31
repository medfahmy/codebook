import express from "express";
import { UserRouter } from "./routes/user.router";
import { config } from "./config/config";
import { log } from "./config/logger";
import { logMethod } from "./middleware/logMethod";
import mongoose from "mongoose";
import cors from "cors";
import { CellRouter } from "./routes/cell.router";

const { port, host, mongoURI, mongoOptions } = config;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: "*",
        // origin: "http://localhost:3000",
        // methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(logMethod);

app.use("/api/users", UserRouter);
app.use("/api/cells", CellRouter);

export const connectDB = async () => {
    return mongoose.connect(mongoURI, mongoOptions);
};

app.listen(port, host, async () => {
    log.info(`server running at http://${host}:${port}`);
    try {
        await connectDB();
        log.info("connected to mongodb");
    } catch (error) {
        log.error("mongodb error", error);
        process.exit(1);
    }
});
