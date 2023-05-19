import { MultipartFile } from '@fastify/multipart'

export type SaveFileResponse = {
  fileUrl: string
}

export type UploadProps = {
  upload: MultipartFile
}

export interface IStorageProvider {
  saveFile({ upload }: UploadProps): Promise<SaveFileResponse>
}
