/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  return knex.schema.createTable('transaction', (table) => {
    table.increments()

    table.integer('amount').defaultTo(0)
    table.integer('client_id').defaultTo(0)
    table.enum('type', ['c', 'd']).notNullable()
    table.string('description', 10)

    table.timestamp('date_create')
      .defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  return knex.schema.dropTable('transaction')
}
