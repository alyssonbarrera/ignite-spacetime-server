import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUpdateMemoryUseCase } from '../factories/make-update-memory-use-case'

export class UpdateMemoryController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const updateMemoryParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const updateMemoryBodySchema = z.object({
      content: z.string().optional(),
      coverUrl: z.string().optional(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { id } = updateMemoryParamsSchema.parse(request.params)
    const { content, coverUrl, isPublic } = updateMemoryBodySchema.parse(
      request.body,
    )

    const useCase = makeUpdateMemoryUseCase()

    const { memory } = await useCase.execute({
      id,
      content,
      coverUrl,
      isPublic,
      userId: request.user.sub,
    })

    return reply.status(200).send({
      memory,
    })
  }
}
