import { Memory } from '@prisma/client'
import { MemoriesRepository } from '../repositories/memories-repository'

type FetchMemoriesUseCaseRequest = {
  page: number
}

type FetchMemoriesUseCaseResponse = {
  memories: {
    id: string
    coverUrl: string
    excerpt: string
  }[]
}

export class FetchMemoriesUseCase {
  constructor(private memoriesRepository: MemoriesRepository) {}

  async execute({
    page,
  }: FetchMemoriesUseCaseRequest): Promise<FetchMemoriesUseCaseResponse> {
    const memories = await this.memoriesRepository.findAll(page)

    const response = memories.map((memory: Memory) => ({
      id: memory.id,
      coverUrl: memory.coverUrl,
      excerpt: memory.content.substring(0, 150),
    }))

    return {
      memories: response,
    }
  }
}
