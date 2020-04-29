import { registerAs } from "@nestjs/config";

export default registerAs('rabbit', () => ({
  URL:  process.env.FISHARE_IDENTITYSERVICE_RMQ_HOST || process.env.RABBIT_HOST,
  user: process.env.RABBIT_USER,
  pass: process.env.RABBIT_PASSWORD,
  port: process.env.RABBIT_PORT,
  exchange: process.env.RABBIT_EXCHANGE,
  queue: process.env.RABBIT_QUEUE,
  Vhost: process.env.RABBIT_VHOST
}));