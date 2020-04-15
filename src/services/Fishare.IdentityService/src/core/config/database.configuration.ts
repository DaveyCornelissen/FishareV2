import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
  URL:  process.env.FISHARE_IDENTITYSERVICE_DB || process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASSWORD
}));