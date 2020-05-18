import { registerAs } from "@nestjs/config";

export default registerAs('rabbit', () => ({
  host:  process.env.FISHARE_RBMQ_HOSTNAME || process.env.RABBIT_HOST,
  user: process.env.FISHARE_RBMQ_USERNAME || process.env.RABBIT_USER,
  pass: process.env.FISHARE_RBMQ_PASSWORD || process.env.RABBIT_PASSWORD,
  port: process.env.FISHARE_RBMQ_PORT || process.env.RABBIT_PORT,
  exchange:  process.env.FISHARE_RBMQ_EXCHANGE ||process.env.RABBIT_EXCHANGE,
  queue: process.env.FISHARE_RBMQ_QUEUE || process.env.RABBIT_QUEUE,
  Vhost: process.env.FISHARE_RBMQ_VHOST || process.env.RABBIT_VHOST
}));