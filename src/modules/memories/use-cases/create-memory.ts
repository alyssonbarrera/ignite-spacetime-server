import { Memory } from '@prisma/client'
import { MemoriesRepository } from '../repositories/memories-repository'

type CreateMemoryUseCaseRequest = {
  content: string
  isPublic: boolean
  coverUrl: string
}

type CreateMemoryUseCaseResponse = {
  memory: Memory
}

export class CreateMemoryUseCase {
  constructor(private memoriesRepository: MemoriesRepository) {}

  async execute({
    content,
    isPublic,
    coverUrl,
  }: CreateMemoryUseCaseRequest): Promise<CreateMemoryUseCaseResponse> {
    const memory = await this.memoriesRepository.create({
      content,
      isPublic,
      coverUrl,
      userId: '1285646f-e9ee-4fdf-a887-906f52d1064a',
    })

    return {
      memory,
    }
  }
}
