import { Memory } from '@prisma/client'
import { MemoryMinDTO } from '../dtos/memory-min-dto'
import { MemoriesRepository } from '../repositories/memories-repository'

type FetchMemoriesUseCaseRequest = {
  userId: string
  page: number
}

type FetchMemoriesUseCaseResponse = {
  memories: MemoryMinDTO[]
}

export class FetchMemoriesUseCase {
  constructor(private memoriesRepository: MemoriesRepository) {}

  async execute({
    userId,
    page,
  }: FetchMemoriesUseCaseRequest): Promise<FetchMemoriesUseCaseResponse> {
    const memories = await this.memoriesRepository.findByUserId(userId, page)

    const response = memories.map((memory: Memory) => {
      return new MemoryMinDTO(memory)
    })

    return {
      memories: response,
    }
  }
}
