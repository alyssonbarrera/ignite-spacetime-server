import { MultipartFile } from '@fastify/multipart'

export type SaveFileResponse = {
  fileUrl: string
}

export type UploadProps = {
  media: MultipartFile
}

export interface IStorageProvider {
  saveFile({ media }: UploadProps): Promise<SaveFileResponse>
  deleteFile(fileUrl: string): Promise<void>
}
