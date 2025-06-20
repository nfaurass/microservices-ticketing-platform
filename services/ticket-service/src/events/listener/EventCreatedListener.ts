import {getChannel} from "../../rabbitmq/connection";
import {EventType, Ticket} from "../../models/Ticket";
import mongoose from "mongoose";

export async function ticketCreatedListener() {
    const channel = getChannel();
    const queue = 'event.created';

    await channel.assertQueue(queue, {durable: true});

    await channel.consume(queue, (msg) => {
        if (msg !== null) {
            const data = JSON.parse(msg.content.toString()) as EventType;
            console.log('[Ticket Service] 📥 Received event.created event:', data);
            Ticket.create({eventId: new mongoose.Types.ObjectId(data.id), ticketTypes: data.ticketTypes});
            channel.ack(msg);
        }
    });

    console.log(`[Ticket Service] 🎧 Listening to "${queue}" queue...`);
}