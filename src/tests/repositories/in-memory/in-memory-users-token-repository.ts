import { randomUUID } from 'node:crypto'
import { Prisma, UserToken } from '@prisma/client'
import { UsersTokenRepository } from '@/modules/users/repositories/users-token-repository'

export class InMemoryUsersTokenRepository implements UsersTokenRepository {
  public items: UserToken[] = []

  async create({
    refreshToken,
    userId,
  }: Prisma.UserTokenUncheckedCreateInput): Promise<UserToken> {
    const userToken = {
      id: randomUUID(),
      userId,
      refreshToken,
      platform: 'web',
      createdAt: new Date(),
    }

    this.items.push(userToken)

    return userToken
  }

  async findByTokenAndUserId(
    token: string,
    userId: string,
  ): Promise<UserToken | null> {
    const userToken = this.items.find(
      (item) => item.refreshToken === token && item.userId === userId,
    )

    return userToken || null
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id)
  }

  async deleteByUserIdAndPlatform(
    userId: string,
    platform: string,
  ): Promise<void> {
    this.items = this.items.filter(
      (item) => item.userId !== userId && item.platform !== platform,
    )
  }

  async deleteAllByUserId(userId: string): Promise<void> {
    this.items = this.items.filter((item) => item.userId !== userId)
  }
}
