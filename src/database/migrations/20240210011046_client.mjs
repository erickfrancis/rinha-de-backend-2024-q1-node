
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  return knex.schema.createTable('client', (table) => {
    table.increments()

    table.string('name').notNullable()
    table.integer('limit').defaultTo(0)
    table.integer('balance').defaultTo(0)
    table.timestamp('date_create')
      .defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  return knex.schema.dropTable('client')
};
