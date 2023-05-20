import { AppError } from '@/shared/errors/AppError'
import { FastifyRequest } from 'fastify'

export async function validateRequestFile(request: FastifyRequest) {
  const upload = await request.file({
    limits: {
      fileSize: 1024 * 1024 * 50, // 50mb
    },
  })

  if (!upload) {
    throw new AppError('File not found', 400)
  }

  const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
  const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

  if (!isValidFileFormat) {
    throw new AppError('Invalid file format. Only images and videos', 400)
  }

  return upload
}
