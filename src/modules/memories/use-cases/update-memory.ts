import { Memory } from '@prisma/client'
import { AppError } from '@/shared/errors/AppError'
import { MemoriesRepository } from '../repositories/memories-repository'

type UpdateMemoryUseCaseRequest = {
  id: string
  content?: string
  coverUrl?: string
  isPublic?: boolean
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
  }: UpdateMemoryUseCaseRequest): Promise<UpdateMemoryUseCaseResponse> {
    const memory = await this.memoriesRepository.findById(id)

    if (!memory) {
      throw new AppError('Memory not found', 404)
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
