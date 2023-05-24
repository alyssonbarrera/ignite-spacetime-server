import { RefreshUseCase } from '../use-cases/refresh'
import { PrismaUsersTokenRepository } from '../repositories/prisma/prisma-users-token-repository'

export function makeRefreshUseCase() {
  const usersTokenRepository = new PrismaUsersTokenRepository()
  const useCase = new RefreshUseCase(usersTokenRepository)

  return useCase
}
