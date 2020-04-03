import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
    environment: process.env.APP_ENV,
    name: process.env.APP_NAME,
    host: process.env.APP_URL,
    port: parseInt(process.env.APP_PORT, 10) || 3000,
  }));