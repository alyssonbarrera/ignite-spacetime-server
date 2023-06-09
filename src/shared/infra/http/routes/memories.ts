import { FastifyInstance } from 'fastify'
import { verifyJWT, optionalVerifyJWT } from '../middlewares/verify-jwt'

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
  app.get(
    '/memories/:id',
    { preHandler: optionalVerifyJWT },
    getMemoryByIdController.handle,
  )

  app.get(
    '/memories',
    { preHandler: verifyJWT },
    fetchMemoriesController.handle,
  )
  app.post(
    '/memories',
    { preHandler: verifyJWT },
    createMemoryController.handle,
  )
  app.put(
    '/memories/:id',
    { preHandler: verifyJWT },
    updateMemoryController.handle,
  )
  app.delete(
    '/memories/:id',
    { preHandler: verifyJWT },
    deleteMemoryController.handle,
  )
}
