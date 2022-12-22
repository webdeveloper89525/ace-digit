import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";

import "dotenv/config";

import connection from "./config/db.config";
import { userRouter } from "./routes/user.route";
import { chartRouter } from "./routes/chart.route";
import { tokenGuard } from "./middlewares/token-guard";

const app = express();
const port = 8001;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

app.get("/welcome", (req: Request, res: Response): Response => {
    return res.json({ message: "ACE Digital Service Welcome message." });
});
app.use("/", userRouter);
app.use("/", chartRouter);

app.use(tokenGuard());

const start = async (): Promise<void> => {
    try {
        await connection.sync();
        app.listen(port, () => {
            console.log("Server started on port " + port);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

void start();
