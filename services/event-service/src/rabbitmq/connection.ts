import amqp from 'amqplib';

let channel: amqp.Channel;

export async function connectRabbitMQ(AMQP_URL: string) {
    const connection = await amqp.connect(AMQP_URL);
    channel = await connection.createChannel();
    console.log('[Event Service]  ✅ RabbitMQ connected');
}

export function getChannel(): amqp.Channel {
    return channel;
}