import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeRefreshUseCase } from '../factories/make-refresh-use-case'

export class RefreshController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const refreshBodySchema = z.object({
      refreshToken: z.string(),
    })

    const platform = request.headers['x-request-origin'] as string

    const { refreshToken: bodyRefreshToken } = refreshBodySchema.parse(
      request.body,
    )

    const useCase = makeRefreshUseCase()

    const { token, refreshToken } = await useCase.execute({
      refreshToken: bodyRefreshToken,
      platform,
    })

    return reply.status(200).send({ token, refreshToken })
  }
}
