export default function (fastify, opts, done) {
  fastify.get('/', (_, reply) => reply.send('pong'))

  fastify.get('/database', async (_, reply) => {
    const check = async () => {
      try {
        await fastify.service.Database.client
          .raw('select 1+1 as result')

        return true
      } catch (e) {
        return false
      }
    }

    const error = !(await check())

    return reply
      .code(error ? 503 : 200)
      .send('pong')
  })

  done()
}
