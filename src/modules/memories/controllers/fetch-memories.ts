import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchMemoriesUseCase } from '../factories/make-fetch-memories'

export class FetchMemoriesController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const fetchMemoriesQuerySchema = z.object({
      page: z.coerce.number().min(1).default(1),
    })

    const { page } = fetchMemoriesQuerySchema.parse(request.query)

    const useCase = makeFetchMemoriesUseCase()

    const { memories } = await useCase.execute({ page })

    return reply.status(200).send({
      memories,
    })
  }
}
