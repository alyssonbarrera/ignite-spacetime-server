import { FastifyReply, FastifyRequest } from 'fastify'
import { validateRequestFile } from '@/utils/validate-request-file'
import { makeUploadUseCase } from '../factories/make-upload-use-case'

export class UploadController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const media = await validateRequestFile(request)

    const useCase = makeUploadUseCase()

    const { fileUrl } = await useCase.execute({ media })

    return reply.status(200).send({
      fileUrl,
    })
  }
}
