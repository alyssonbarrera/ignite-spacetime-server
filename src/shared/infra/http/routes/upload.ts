import { FastifyInstance } from 'fastify'
import { UploadController } from '@/modules/memories/controllers/upload'

const uploadController = new UploadController()

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', uploadController.handle)
}
