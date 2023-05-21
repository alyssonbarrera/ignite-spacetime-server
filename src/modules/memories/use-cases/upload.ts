import { makeStorageProvider } from '@/shared/containers/providers/storage-provider'

type UploadUseCaseRequest = {
  media: any
}

type UploadUseCaseResponse = {
  fileUrl: string
}

export class UploadUseCase {
  constructor() {}

  async execute({
    media,
  }: UploadUseCaseRequest): Promise<UploadUseCaseResponse> {
    const storageProvider = makeStorageProvider()

    const { fileUrl } = await storageProvider.saveFile({ media })

    console.log('fileUrl', fileUrl)
    console.log('media', media)

    return {
      fileUrl,
    }
  }
}
