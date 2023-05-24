import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetMemoryByIdUseCase } from '../factories/make-get-memory-by-id-use-case'

export class GetMemoryByIdController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const getMemoryByIdParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getMemoryByIdParamsSchema.parse(request.params)

    const useCase = makeGetMemoryByIdUseCase()

    const { memory } = await useCase.execute({ id, userId: request.user?.sub })

    return reply.status(200).send({
      memory,
    })
  }
}
