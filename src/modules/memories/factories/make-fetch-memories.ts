import { PrismaMemoriesRepository } from '../repositories/prisma/prisma-memories-repository'
import { FetchMemoriesUseCase } from '../use-cases/fetch-memories'

export function makeFetchMemoriesUseCase() {
  const memoriesRepository = new PrismaMemoriesRepository()
  const useCase = new FetchMemoriesUseCase(memoriesRepository)

  return useCase
}
