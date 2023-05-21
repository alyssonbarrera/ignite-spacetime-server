import { AppError } from '@/shared/errors/AppError'
import { MemoriesRepository } from '../repositories/memories-repository'
import { makeStorageProvider } from '@/shared/containers/providers/storage-provider'

type DeleteMemoryUseCaseRequest = {
  id: string
  userId: string
}

type DeleteMemoryUseCaseResponse = {}

export class DeleteMemoryUseCase {
  constructor(private memoriesRepository: MemoriesRepository) {}

  async execute({
    id,
    userId,
  }: DeleteMemoryUseCaseRequest): Promise<DeleteMemoryUseCaseResponse> {
    const memory = await this.memoriesRepository.findById(id)

    if (!memory) {
      throw new AppError('Memory not found', 404)
    }

    if (memory.userId !== userId) {
      throw new AppError('You are not allowed to delete this memory', 403)
    }

    const storageProvider = makeStorageProvider()

    await this.memoriesRepository.delete(id)
    await storageProvider.deleteFile(memory.coverUrl)

    return {}
  }
}
