export const seed = function (knex) {

  const items = [
    { id: 0, name: 'o barato sai caro', balance: 0 },
    { id: 1, name: 'zan corp ltda', balance: 0 },
    { id: 2, name: 'les cruders', balance: 0 },
    { id: 3, name: 'padaria joia de cocaia', balance: 0 },
    { id: 4, name: 'kid mais', balance: 0 }
  ]

  return knex('client')
    .insert(items)
    .onConflict('id')
    .merge()
}
