import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeAuthenticateUseCase } from '../factories/make-authenticate-use-case'

export class AuthenticateController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const platform = request.headers['x-request-origin'] as string

    const authenticateBodySchema = z.object({
      code: z.string(),
    })

    const { code } = authenticateBodySchema.parse(request.body)

    const useCase = makeAuthenticateUseCase()

    const { token, refreshToken } = await useCase.execute({
      code,
      platform,
    })

    return reply.status(200).send({ token, refreshToken })
  }
}
