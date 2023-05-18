import { FastifyInstance } from 'fastify'

import { AuthenticateController } from '@/modules/users/controllers/authenticate'

const authenticateController = new AuthenticateController()

export async function usersRoutes(app: FastifyInstance) {
  app.post('/register', authenticateController.handle)
}
