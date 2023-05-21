import { Memory } from '@prisma/client'
import { AppError } from '@/shared/errors/AppError'
import { MemoriesRepository } from '../repositories/memories-repository'
import { makeStorageProvider } from '@/shared/containers/providers/storage-provider'

type UpdateMemoryUseCaseRequest = {
  id: string
  content?: string
  coverUrl?: string
  isPublic?: boolean
  userId: string
}

type UpdateMemoryUseCaseResponse = {
  memory: Memory
}

export class UpdateMemoryUseCase {
  constructor(private memoriesRepository: MemoriesRepository) {}

  async execute({
    id,
    content,
    coverUrl,
    isPublic,
    userId,
  }: UpdateMemoryUseCaseRequest): Promise<UpdateMemoryUseCaseResponse> {
    const memory = await this.memoriesRepository.findById(id)

    if (!memory) {
      throw new AppError('Memory not found', 404)
    }

    if (memory.userId !== userId) {
      throw new AppError('You are not allowed to update this memory', 403)
    }

    const storageProvider = makeStorageProvider()

    if (coverUrl && memory.coverUrl) {
      await storageProvider.deleteFile(memory.coverUrl)
    }

    const updatedMemory = await this.memoriesRepository.update(id, {
      content,
      coverUrl,
      isPublic,
    })

    return {
      memory: updatedMemory,
    }
  }
}
