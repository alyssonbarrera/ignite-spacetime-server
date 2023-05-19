import { FastifyInstance } from 'fastify'
import { UploadController } from '@/modules/memories/controllers/upload'
import { verifyUserAgent } from '../middlewares/verify-user-agent'

const uploadController = new UploadController()

export async function uploadRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyUserAgent)

  app.post('/upload', uploadController.handle)
}
