import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateMemoryUseCase } from '../factories/make-create-memory-use-case'

export class CreateMemoryController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createMemoryParamsSchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = createMemoryParamsSchema.parse(
      request.body,
    )

    const useCase = makeCreateMemoryUseCase()

    await useCase.execute({
      content,
      isPublic,
      coverUrl,
      userId: request.user.sub,
    })

    return reply.status(201).send()
  }
}
