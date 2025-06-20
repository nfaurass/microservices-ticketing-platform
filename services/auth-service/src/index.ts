import express, {Request, Response} from 'express';
import {authRouter} from "./routes/auth";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({}));
app.use(express.json());
app.use(authRouter);

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
if (!(PORT && MONGO_URI && JWT_SECRET)) process.exit(1);

const start = async () => {
    try {
        await mongoose.connect(MONGO_URI + '/main');
        console.log('[Auth Service] ✅ MongoDB connected');

        app.get("/", (req: Request, res: Response) => {
            res.json({"status": "200"});
        });

        app.listen(PORT, () => {
            console.log(`[Auth Service] 🚀 running on port ${PORT}`);
        });
    } catch (err) {
        console.error('[Auth Service] ❌ Startup error:', err);
    }
};

start();