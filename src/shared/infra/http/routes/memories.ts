import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../middlewares/verify-jwt'

import { FetchMemoriesController } from '@/modules/memories/controllers/fetch-memories'
import { GetMemoryByIdController } from '@/modules/memories/controllers/get-memory-by-id'
import { CreateMemoryController } from '@/modules/memories/controllers/create-memory'
import { DeleteMemoryController } from '@/modules/memories/controllers/delete-memory'
import { UpdateMemoryController } from '@/modules/memories/controllers/update-memory'

const fetchMemoriesController = new FetchMemoriesController()
const getMemoryByIdController = new GetMemoryByIdController()
const createMemoryController = new CreateMemoryController()
const deleteMemoryController = new DeleteMemoryController()
const updateMemoryController = new UpdateMemoryController()

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', verifyJWT)

  app.get('/memories', fetchMemoriesController.handle)
  app.get('/memories/:id', getMemoryByIdController.handle)
  app.post('/memories', createMemoryController.handle)
  app.put('/memories/:id', updateMemoryController.handle)
  app.delete('/memories/:id', deleteMemoryController.handle)
}
