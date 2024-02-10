import Fastify from 'fastify'
import Services from './services/index.mjs'
import Routes from './routes/index.mjs'

export const app = Fastify({
  trustProxy: true
})

app.decorate('service', new Services())

Routes(app)

const port = Number(process.env.PORT || 9999)
const host = process.env.HOST || '0.0.0.0'

export const listen = () => {
  app.listen({ port, host }, () => console.log(`Listening on: ${port}`))
}

export default listen()
