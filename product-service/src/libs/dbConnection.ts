import { Pool } from 'pg';
// import dotenv from 'dotenv'
// dotenv.config()


let DATABASE_HOST='cloudfront-database-instance.cpds6klib029.eu-west-1.rds.amazonaws.com',
DATABASE_PORT=5432,
USER_NAME='postgres',
DATABASE_PASSWORD='fK7er7Y0eRTFsVYHyEvP',
DATABASE_NAME='cloudfront_database';

export const createDbConnection = () => {
  return new Pool({
    host: DATABASE_HOST,
    port: Number(DATABASE_PORT),
    user: USER_NAME,
    database: DATABASE_NAME,
    password: DATABASE_PASSWORD,
  })
}
