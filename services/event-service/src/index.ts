import express, {Request, Response} from 'express';
import {eventRouter} from "./routes/event";
import mongoose from "mongoose";
import {connectRabbitMQ} from "./rabbitmq/connection";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({}));
app.use(express.json());
app.use(eventRouter);

const KAFKA_BROKER = process.env.KAFKA_BROKER;
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
if (!(PORT && KAFKA_BROKER && MONGO_URI)) process.exit(1);

const start = async () => {
    try {
        await mongoose.connect(MONGO_URI + '/main');
        console.log('[Event Service] ✅ MongoDB connected');

        await connectRabbitMQ(KAFKA_BROKER);

        app.get("/", (req: Request, res: Response) => {
            res.json({"status": "200"});
        });

        app.listen(PORT, () => {
            console.log(`[Event Service] 🚀 running on port ${PORT}`);
        });
    } catch (err) {
        console.error('[Event Service] ❌ Startup error:', err);
    }
};

start();