import { FastifyInstance } from 'fastify'
import { AuthenticateController } from '@/modules/users/controllers/authenticate'
import { RefreshController } from '@/modules/users/controllers/refresh'

const authenticateController = new AuthenticateController()
const refreshController = new RefreshController()

export async function usersRoutes(app: FastifyInstance) {
  app.post('/register', authenticateController.handle)
  app.patch('/token/refresh', refreshController.handle)
}
