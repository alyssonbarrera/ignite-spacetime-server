import { UpdateMemoryUseCase } from '../use-cases/update-memory'
import { PrismaMemoriesRepository } from '../repositories/prisma/prisma-memories-repository'

export function makeUpdateMemoryUseCase() {
  const memoriesRepository = new PrismaMemoriesRepository()
  const useCase = new UpdateMemoryUseCase(memoriesRepository)

  return useCase
}
