import { MemoriesRepository } from '../repositories/memories-repository'
import { makeLocalStorageProvider } from '@/shared/containers/providers/storage-provider'

type UploadUseCaseRequest = {
  upload: any
}

type UploadUseCaseResponse = {
  fileUrl: string
}

export class UploadUseCase {
  constructor(private memoriesRepository: MemoriesRepository) {}

  async execute({
    upload,
  }: UploadUseCaseRequest): Promise<UploadUseCaseResponse> {
    const storageProvider = makeLocalStorageProvider()

    const { fileUrl } = await storageProvider.saveFile({ upload })

    return {
      fileUrl,
    }
  }
}
