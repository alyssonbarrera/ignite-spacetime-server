import { promises } from 'node:fs'
import { resolve } from 'node:path'
import { S3, config } from 'aws-sdk'
import {
  IStorageProvider,
  SaveFileResponse,
  UploadProps,
} from '../interface-storage-provider'

import { env } from '@/shared/env'
import upload from '@/config/upload'

config.update({
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  region: env.AWS_REGION,
})

export class S3StorageProvider implements IStorageProvider {
  private client: S3

  constructor() {
    this.client = new S3({
      region: process.env.AWS_REGION,
    })
  }

  async saveFile({ media }: UploadProps): Promise<SaveFileResponse> {
    const { fileName, mimetype } = await upload.data(media)
    const tmpFolder = upload.tmpFolder

    const fileContent = await promises.readFile(resolve(tmpFolder, fileName))
    const contentType = mimetype

    const folder = 'memories'

    await this.client
      .putObject({
        Bucket: `${env.AWS_BUCKET}/${folder}`,
        Key: fileName,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: contentType,
      })
      .promise()

    await promises.unlink(resolve(tmpFolder, fileName))

    return {
      fileUrl: `https://${env.AWS_BUCKET}.s3.amazonaws.com/${folder}/${fileName}`,
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const folder = 'memories'
    const fileName = fileUrl.split('/').pop()

    await this.client
      .deleteObject({
        Bucket: env.AWS_BUCKET,
        Key: `${folder}/${fileName}`,
      })
      .promise()
  }
}
