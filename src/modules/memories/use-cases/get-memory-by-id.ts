import { Memory } from '@prisma/client'
import { AppError } from '@/shared/errors/AppError'
import { MemoriesRepository } from '../repositories/memories-repository'

type GetMemoryByIdUseCaseRequest = {
  id: string
}

type GetMemoryByIdUseCaseResponse = {
  memory: Memory
}

export class GetMemoryByIdUseCase {
  constructor(private memoriesRepository: MemoriesRepository) {}

  async execute({
    id,
  }: GetMemoryByIdUseCaseRequest): Promise<GetMemoryByIdUseCaseResponse> {
    const memory = await this.memoriesRepository.findById(id)

    if (!memory) {
      throw new AppError('Memory not found', 404)
    }

    return {
      memory,
    }
  }
}
