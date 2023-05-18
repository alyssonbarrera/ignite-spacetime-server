import { CreateMemoryUseCase } from '../use-cases/create-memory'
import { PrismaUsersRepository } from '../../users/repositories/prisma/prisma-users-repository'
import { PrismaMemoriesRepository } from '../repositories/prisma/prisma-memories-repository'

export function makeCreateMemoryUseCase() {
  const memoriesRepository = new PrismaMemoriesRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new CreateMemoryUseCase(memoriesRepository, usersRepository)

  return useCase
}
