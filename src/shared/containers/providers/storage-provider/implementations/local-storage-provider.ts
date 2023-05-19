import { resolve } from 'path'
import { randomUUID } from 'node:crypto'

import { env } from '@/shared/env'
import { extname } from 'node:path'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream'
import { createWriteStream } from 'node:fs'

import {
  IStorageProvider,
  SaveFileResponse,
  UploadProps,
} from '../interface-storage-provider'

const pump = promisify(pipeline)

const tmpFolder = resolve(__dirname, '..', '..', '..', '..', '..', '..', 'tmp')

export class LocalStorageProvider implements IStorageProvider {
  async saveFile({ upload }: UploadProps): Promise<SaveFileResponse> {
    const fileId = randomUUID()
    const extension = extname(upload.filename)
    const fileName = fileId.concat(extension)

    const writeStream = createWriteStream(resolve(tmpFolder, fileName))

    await pump(upload.file, writeStream)

    const fullUrl = env.REQUEST_PROTOCOL.concat('://').concat(
      env.REQUEST_HOSTNAME,
    )

    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

    return {
      fileUrl,
    }
  }
}
