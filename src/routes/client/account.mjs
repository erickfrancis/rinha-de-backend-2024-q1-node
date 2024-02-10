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

    if (client.limit < Math.abs(saldo)) {
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
    reply.send({
      saldo: {
        total: -9098,
        data_extrato: '2024-01-17T02:34:41.217753Z',
        limite: 100000
      },
      ultimas_transacoes: [
        {
          valor: 10,
          tipo: 'c',
          descricao: 'descricao',
          realizada_em: '2024-01-17T02:34:38.543030Z'
        },
        {
          valor: 90000,
          tipo: 'd',
          descricao: 'descricao',
          realizada_em: '2024-01-17T02:34:38.543030Z'
        }
      ]
    })
  })

  done()
}
