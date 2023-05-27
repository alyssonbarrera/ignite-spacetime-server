import { UserToken, Prisma } from '@prisma/client'

export interface UsersTokenRepository {
  create({
    refreshToken,
    userId,
    platform,
  }: Prisma.UserTokenUncheckedCreateInput): Promise<UserToken>
  findByTokenAndUserId(token: string, userId: string): Promise<UserToken | null>
  delete(id: string): Promise<void>
  deleteByUserIdAndPlatform(userId: string, platform: string): Promise<void>
  deleteAllByUserId(userId: string): Promise<void>
}
