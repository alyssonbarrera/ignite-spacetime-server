import { GetMemoryByIdUseCase } from '../use-cases/get-memory-by-id'
import { PrismaMemoriesRepository } from '../repositories/prisma/prisma-memories-repository'

export function makeGetMemoryByIdUseCase() {
  const memoriesRepository = new PrismaMemoriesRepository()
  const useCase = new GetMemoryByIdUseCase(memoriesRepository)

  return useCase
}
