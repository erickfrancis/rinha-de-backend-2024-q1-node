import Health from './health.mjs'
import ClientAccount from './client/account.mjs'

export default (app) => {
  app.register(Health, { prefix: '/ping' })
  app.register(ClientAccount, { prefix: '/clientes/:client_id' })
}
