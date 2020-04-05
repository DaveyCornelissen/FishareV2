import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
  container: process.env.DATABASE_CONTAINER,
  name: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 3000,
  URL: `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CONTAINER}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?authSource=${process.env.DATABASE_NAME}`,
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASSWORD
}));