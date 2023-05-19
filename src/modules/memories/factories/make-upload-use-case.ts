import { UploadUseCase } from '../use-cases/upload'
import { PrismaMemoriesRepository } from '../repositories/prisma/prisma-memories-repository'

export function makeUploadUseCase() {
  const memoriesRepository = new PrismaMemoriesRepository()
  const useCase = new UploadUseCase(memoriesRepository)

  return useCase
}
