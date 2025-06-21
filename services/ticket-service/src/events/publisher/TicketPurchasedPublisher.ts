import {getChannel} from '../../rabbitmq/connection';
import {TicketPurchasedAttr} from "../../models/Ticket";

export async function publishTicketPurchased(data: TicketPurchasedAttr) {
    const channel = getChannel();
    const queue = 'ticket.purchased';

    await channel.assertQueue(queue, {durable: true});
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
        persistent: true,
    });

    console.log('[Ticket Service] 📩 Published ticket.purchased event:', data);
}