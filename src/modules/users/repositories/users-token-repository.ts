import { UserToken, Prisma } from '@prisma/client'

export interface UsersTokenRepository {
  create({
    refreshToken,
    userId,
  }: Prisma.UserTokenUncheckedCreateInput): Promise<UserToken>
  findByTokenAndUserId(token: string, userId: string): Promise<UserToken | null>
  delete(id: string): Promise<void>
  deleteAllByUserId(userId: string): Promise<void>
}
