import { PrismaMemoriesRepository } from '../repositories/prisma/prisma-memories-repository'
import { CreateMemoryUseCase } from '../use-cases/create-memory'

export function makeCreateMemoryUseCase() {
  const memoriesRepository = new PrismaMemoriesRepository()
  const useCase = new CreateMemoryUseCase(memoriesRepository)

  return useCase
}
