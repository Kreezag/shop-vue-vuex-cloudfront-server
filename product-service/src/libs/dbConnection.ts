import { RDS } from 'aws-sdk'
const { Pool } = require('pg')

const signerOptions = {
  region: 'eu-west-1',
  hostname: 'cloudfront-database-instance.cpds6klib029.eu-west-1.rds.amazonaws.com',
  port: 5432,
  username: 'postgres'
};

const signer = new RDS.Signer()
const getPassword = () => signer.getAuthToken(signerOptions)

export const createDbConnection = () => {
  return new Pool({
    host: signerOptions.hostname,
    port: signerOptions.port,
    user: signerOptions.username,
    database: 'my-db',
    password: getPassword,
  })
}
