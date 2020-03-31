export default () => ({
    container: process.env.DATABASE_CONTAINER,
    name: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3000,

  });