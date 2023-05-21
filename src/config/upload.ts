import { promisify } from 'node:util'
import { pipeline } from 'node:stream'
import { randomUUID } from 'node:crypto'
import { createWriteStream } from 'node:fs'
import { extname, resolve } from 'node:path'
import { MultipartFile } from '@fastify/multipart'
import { env } from '@/shared/env'

const tmpFolder =
  env.NODE_ENV === 'prod'
    ? resolve(__dirname, '..', '..', '..', 'tmp')
    : resolve(__dirname, '..', 'tmp')
const pump = promisify(pipeline)

export default {
  tmpFolder,
  data: async ({ file, filename, mimetype }: MultipartFile) => {
    const fileId = randomUUID()
    const extension = extname(filename)
    const fileName = fileId.concat(extension)

    const writeStream = createWriteStream(resolve(tmpFolder, fileName))

    await pump(file, writeStream)

    return {
      file,
      mimetype,
      fileName,
    }
  },
}
