import express, {Request, Response} from 'express';
import {ticketRouter} from "./routes/ticket";
import mongoose from "mongoose";
import {connectRabbitMQ} from "./rabbitmq/connection";
import dotenv from "dotenv";
import {ticketCreatedListener} from "./events/listener/EventCreatedListener";

dotenv.config();

const app = express();
app.use(express.json());
app.use(ticketRouter);

const KAFKA_BROKER = process.env.KAFKA_BROKER;
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
if (!(PORT && KAFKA_BROKER && MONGO_URI)) process.exit(1);

const start = async () => {
    try {
        await mongoose.connect(MONGO_URI + '/tickets');
        console.log('[Ticket Service] ✅ MongoDB connected');

        await connectRabbitMQ(KAFKA_BROKER);
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