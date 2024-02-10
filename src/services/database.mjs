
import DatabaseConfig from '../database/config.mjs'
import knex from 'knex'

export default class Service {
  #client

  constructor () {
    this.#client = knex(DatabaseConfig)
  }

  get client () { return this.#client }
}
