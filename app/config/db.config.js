import dotenv from "dotenv";
dotenv.config();
const db = {
  HOST: `${process.env.DB_HOST}`,
  USER: `${process.env.DB_USER}`,
  PASSWORD: `${process.env.DB_PASSWORD}`,
  DB: `${
    process.env.ENV == "test" ? process.env.TEST_DATABASE : process.env.DATABASE
  }`,
  PORT: process.env.DB_PORT,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default db;
