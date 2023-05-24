import { PrismaUsersTokenRepository } from '../repositories/prisma/prisma-users-token-repository'
import { AuthenticateUseCase } from '../use-cases/authenticate'
import { PrismaUsersRepository } from '@/modules/users/repositories/prisma/prisma-users-repository'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const usersTokenRepository = new PrismaUsersTokenRepository()
  const useCase = new AuthenticateUseCase(usersRepository, usersTokenRepository)

  return useCase
}
