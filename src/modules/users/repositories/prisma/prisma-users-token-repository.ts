import { prisma } from '@/shared/lib/prisma'
import { Prisma, UserToken } from '@prisma/client'
import { UsersTokenRepository } from '../users-token-repository'

export class PrismaUsersTokenRepository implements UsersTokenRepository {
  async create({
    refreshToken,
    userId,
  }: Prisma.UserTokenUncheckedCreateInput): Promise<UserToken> {
    const userToken = await prisma.userToken.create({
      data: {
        refreshToken,
        userId,
      },
    })

    return userToken
  }

  async findByTokenAndUserId(
    token: string,
    userId: string,
  ): Promise<UserToken | null> {
    const userToken = await prisma.userToken.findFirst({
      where: {
        refreshToken: token,
        userId,
      },
    })

    return userToken
  }

  async delete(id: string): Promise<void> {
    await prisma.userToken.delete({
      where: {
        id,
      },
    })
  }

  async deleteAllByUserId(userId: string): Promise<void> {
    await prisma.userToken.deleteMany({
      where: {
        userId,
      },
    })
  }
}
