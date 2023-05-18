import { AuthenticateUseCase } from '../use-cases/authenticate'
import { PrismaUsersRepository } from '@/modules/users/repositories/prisma/prisma-users-repository'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new AuthenticateUseCase(usersRepository)

  return useCase
}
