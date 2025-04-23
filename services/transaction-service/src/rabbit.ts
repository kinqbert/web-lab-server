import * as amqp from "amqplib";
import { Channel } from "amqplib";
import CONFIG from "./config/env";

let channel: Channel;

export async function connectRabbit() {
  const uri = CONFIG.RABBIT_URI;
  const conn = await amqp.connect(uri);
  channel = await conn.createChannel();
  console.log("🐇 RabbitMQ connected");
}

export async function publish(
  exchange: string,
  routingKey: string,
  msg: object
) {
  if (!channel) return;
  await channel.assertExchange(exchange, "topic", { durable: false });
  channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)));
}

export async function subscribe(
  exchange: string,
  routingKey: string,
  queue: string,
  handler: (data: any) => Promise<void> | void
) {
  if (!channel) return;
  await channel.assertExchange(exchange, "topic", { durable: false });
  const q = await channel.assertQueue(queue, { durable: false });
  await channel.bindQueue(q.queue, exchange, routingKey);
  channel.consume(q.queue, async (msg) => {
    if (!msg) return;
    const data = JSON.parse(msg.content.toString());
    await handler(data);
    channel.ack(msg);
  });
}
