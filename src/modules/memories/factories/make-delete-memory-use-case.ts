import { DeleteMemoryUseCase } from '../use-cases/delete-memory'
import { PrismaMemoriesRepository } from '../repositories/prisma/prisma-memories-repository'

export function makeDeleteMemoryUseCase() {
  const memoriesRepository = new PrismaMemoriesRepository()
  const useCase = new DeleteMemoryUseCase(memoriesRepository)

  return useCase
}
