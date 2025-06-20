import {getChannel} from '../../rabbitmq/connection';
import {EventAttrs} from "../../models/Event";

export async function publishEventCreated(data: EventAttrs) {
    const channel = getChannel();
    const queue = 'event.created';

    await channel.assertQueue(queue, {durable: true});
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
        persistent: true,
    });

    console.log('[Event Service] 📩 Published event.created event:', data);
}