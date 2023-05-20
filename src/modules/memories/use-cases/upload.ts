import { makeStorageProvider } from '@/shared/containers/providers/storage-provider'

type UploadUseCaseRequest = {
  upload: any
}

type UploadUseCaseResponse = {
  fileUrl: string
}

export class UploadUseCase {
  constructor() {}

  async execute({
    upload,
  }: UploadUseCaseRequest): Promise<UploadUseCaseResponse> {
    const storageProvider = makeStorageProvider()

    const { fileUrl } = await storageProvider.saveFile({ upload })

    return {
      fileUrl,
    }
  }
}
