import { FastifyInstance } from 'fastify'

import { verifyUserAgent } from '../middlewares/verify-user-agent'
import { AuthenticateController } from '@/modules/users/controllers/authenticate'

const authenticateController = new AuthenticateController()

export async function usersRoutes(app: FastifyInstance) {
  app.addHook('preHandler', verifyUserAgent)

  app.post('/register', authenticateController.handle)
}
