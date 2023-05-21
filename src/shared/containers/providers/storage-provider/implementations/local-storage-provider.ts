import { resolve } from 'path'
import { promises } from 'fs'
import {
  IStorageProvider,
  SaveFileResponse,
  UploadProps,
} from '../interface-storage-provider'

import { env } from '@/shared/env'
import upload from '@/config/upload'

export class LocalStorageProvider implements IStorageProvider {
  async saveFile({ media }: UploadProps): Promise<SaveFileResponse> {
    const { fileName } = await upload.data(media)

    const fullUrl = env.REQUEST_PROTOCOL.concat('://').concat(
      env.REQUEST_HOSTNAME,
    )

    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

    return {
      fileUrl,
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const tmpFolder = upload.tmpFolder
    const fileName = fileUrl.split('/uploads/')[1]
    await promises.unlink(resolve(tmpFolder, fileName))
  }
}
