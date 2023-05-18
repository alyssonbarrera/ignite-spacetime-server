import { z } from 'zod'
import { app } from '@/shared/infra/http/app'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeAuthenticateUseCase } from '../factories/make-authenticate-use-case'

export class AuthenticateController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
      code: z.string(),
    })

    const { code } = authenticateBodySchema.parse(request.body)

    const useCase = makeAuthenticateUseCase()

    const { user } = await useCase.execute({ code })

    const token = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: '7d',
      },
    )

    return reply.status(200).send({ token })
  }
}
