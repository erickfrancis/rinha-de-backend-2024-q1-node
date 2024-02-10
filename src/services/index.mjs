import Database from './database.mjs'

export default class Services {
  #Database

  get Database () {
    this.#Database ??= new Database()

    return this.#Database
  }
}
