import { Pool } from 'pg';
import * as dotenv from 'dotenv'
dotenv.config()


export const createDbConnection = () => {
  return new Pool({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
  })
}
