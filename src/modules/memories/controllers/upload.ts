import { FastifyReply, FastifyRequest } from 'fastify'
import { validateRequestFile } from '@/utils/validate-request-file'
import { makeUploadUseCase } from '../factories/make-upload-use-case'

export class UploadController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const upload = await validateRequestFile(request)

    const useCase = makeUploadUseCase()

    const { fileUrl } = await useCase.execute({ upload })

    return reply.status(200).send({
      fileUrl,
    })
  }
}
