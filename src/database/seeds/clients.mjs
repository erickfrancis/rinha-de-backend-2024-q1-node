export const seed = function (knex) {
  const items = [
    { id: 1, name: 'o barato sai caro', balance: 0, limit: 100000 },
    { id: 2, name: 'zan corp ltda', balance: 0, limit: 80000 },
    { id: 3, name: 'les cruders', balance: 0, limit: 1000000 },
    { id: 4, name: 'padaria joia de cocaia', balance: 0, limit: 10000000 },
    { id: 5, name: 'kid mais', balance: 0, limit: 500000 }
  ]

  return knex('client')
    .insert(items)
    .onConflict('id')
    .merge()
}
