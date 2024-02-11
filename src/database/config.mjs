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
  }
}

export default main
