import pg from "pg";
import { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } from './config/env.js';

const {Client} = pg;


const client = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

export {client}