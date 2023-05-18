import { Memory } from '@prisma/client'
import { AppError } from '@/shared/errors/AppError'
import { MemoriesRepository } from '../repositories/memories-repository'

type GetMemoryByIdUseCaseRequest = {
  id: string
  userId: string
}

type GetMemoryByIdUseCaseResponse = {
  memory: Memory
}

export class GetMemoryByIdUseCase {
  constructor(private memoriesRepository: MemoriesRepository) {}

  async execute({
    id,
    userId,
  }: GetMemoryByIdUseCaseRequest): Promise<GetMemoryByIdUseCaseResponse> {
    const memory = await this.memoriesRepository.findById(id)

    if (!memory) {
      throw new AppError('Memory not found', 404)
    }

    if (!memory.isPublic && memory.userId !== userId) {
      throw new AppError('You are not allowed to see this memory', 403)
    }

    return {
      memory,
    }
  }
}
