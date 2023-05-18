import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeDeleteMemoryUseCase } from '../factories/make-delete-memory-use-case'

export class DeleteMemoryController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const deleteMemoryParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = deleteMemoryParamsSchema.parse(request.params)

    const useCase = makeDeleteMemoryUseCase()

    await useCase.execute({ id, userId: request.user.sub })

    return reply.status(204).send()
  }
}
