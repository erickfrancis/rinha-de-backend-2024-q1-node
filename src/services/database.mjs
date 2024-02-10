import DatabaseConfig from '../database/config.mjs'
import knex from 'knex'

export default class Service {
  #knex

  constructor () {
    this.#knex = knex(DatabaseConfig)
  }

  get knex () { return this.#knex }
}
