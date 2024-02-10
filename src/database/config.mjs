import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const main = {
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST || 'db',
    user: process.env.DATABASE_USER || 'admin',
    password: process.env.DATABASE_PASSWORD || 'admin',
    database: process.env.DATABASE_DB || 'rinha'
  },
  migrations: {
    loadExtensions: ['.mjs']
  },
  seeds: {
    loadExtensions: ['.mjs']
  },
  // pool: { min: 0, max: 15 }
}

export default main
