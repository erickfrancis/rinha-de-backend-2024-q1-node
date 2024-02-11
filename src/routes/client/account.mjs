const transactionTypes = ['c', 'd']

export default function (fastify, opts, done) {
  fastify.post('/transacoes', async (request, reply) => {
    const { tipo, descricao } = request.body
    const valor = Number(request.body.valor)
    const clientId = request.params.client_id

    if (!descricao || descricao.length > 10 || descricao.length === 0) {
      return reply.code(422).send()
    }

    if (!Number.isInteger(valor)) {
      return reply.code(422).send()
    }

    if (!transactionTypes.includes(tipo)) {
      return reply.code(422).send()
    }

    const client = await fastify.service.Database.knex('client')
      .select(['limit', 'balance'])
      .where('id', clientId)
      .first()

    if (!client) {
      return reply.code(404).send()
    }

    const saldo = tipo === 'c'
      ? client.balance + Math.abs(valor)
      : client.balance - Math.abs(valor)

    if ((-1 * client.limit) > saldo) {
      return reply.code(422).send()
    }

    await fastify.service.Database.knex('transaction')
      .insert(
        {
          amount: valor,
          type: tipo,
          description: descricao,
          client_id: clientId
        }
      )

    await fastify.service.Database.knex('client')
      .where('id', clientId)
      .update({
        balance: saldo
      })

    reply.send({
      limite: client.limit,
      saldo
    })
  })

  fastify.get('/extrato', async (request, reply) => {
    const clientId = request.params.client_id

    const client = await fastify.service.Database.knex('client')
      .select(['limit', 'balance'])
      .where('id', clientId)
      .first()

    if (!client) {
      return reply.code(404).send()
    }

    const transactions = await fastify.service.Database.knex('transaction')
      .where('client_id', clientId)
      .orderBy('date_create', 'desc')
      .limit(10)

    reply.send({
      saldo: {
        total: client.balance,
        data_extrato: new Date(),
        limite: client.limit
      },
      ultimas_transacoes: transactions.map(
        transaction => ({
          valor: transaction.amount,
          tipo: transaction.type,
          descricao: transaction.description,
          realizada_em: transaction.date_create
        })
      )
    })
  })

  done()
}
