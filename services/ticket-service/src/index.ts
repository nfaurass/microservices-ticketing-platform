import express, {Request, Response} from 'express';
import {ticketRouter} from "./routes/ticket";
import mongoose from "mongoose";
import {connectRabbitMQ} from "./rabbitmq/connection";
import dotenv from "dotenv";
import {ticketCreatedListener} from "./events/listener/EventCreatedListener";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({}));
app.use(express.json());
app.use(ticketRouter);

const RABBITMQ_HOST = process.env.RABBITMQ_HOST;
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
if (!(PORT && RABBITMQ_HOST && MONGO_URI)) process.exit(1);

const start = async () => {
    try {
        await mongoose.connect(MONGO_URI + '/main');
        console.log('[Ticket Service] ✅ MongoDB connected');

        await connectRabbitMQ(RABBITMQ_HOST);
        await ticketCreatedListener();

        app.get("/", (req: Request, res: Response) => {
            res.json({"status": "200"});
        });

        app.listen(PORT, () => {
            console.log(`[Ticket Service] 🚀 running on port ${PORT}`);
        });
    } catch (err) {
        console.error('[Ticket Service] ❌ Startup error:', err);
    }
};

start();