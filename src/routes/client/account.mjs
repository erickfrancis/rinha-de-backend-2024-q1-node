export default function (fastify, opts, done) {
  fastify.post('/transacoes', async (request, reply) => {
    const data = {
      valor: 1000,
      tipo: 'c',
      descricao: 'descricao'
    }

    reply.send({
      limite: 100000,
      saldo: -9098
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
