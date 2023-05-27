import dayjs from 'dayjs'
import jwt from 'jsonwebtoken'
import auth from '@/config/auth'
import { AppError } from '@/shared/errors/AppError'
import { UsersTokenRepository } from '../repositories/users-token-repository'

type RefreshUseCaseRequest = {
  refreshToken: string
  platform: string
}

type RefreshUseCaseResponse = {
  token: string
  refreshToken: string
}

type RefreshTokenPayload = {
  name: string
  avatarUrl: string
  sub: string
  iat: number
  exp: number
}

export class RefreshUseCase {
  constructor(private usersTokenRepository: UsersTokenRepository) {}

  async execute({
    refreshToken,
    platform,
  }: RefreshUseCaseRequest): Promise<RefreshUseCaseResponse> {
    const { jwt_secret, expires_in_token, expires_in_refresh_token } = auth

    const { avatarUrl, name, sub, exp } = jwt.verify(refreshToken, jwt_secret, {
      ignoreExpiration: true,
    }) as RefreshTokenPayload

    const isTokenExpired = dayjs().isAfter(dayjs.unix(exp))

    if (isTokenExpired) {
      throw new AppError('Expired refresh token', 401)
    }

    const userId = sub

    const userToken = await this.usersTokenRepository.findByTokenAndUserId(
      refreshToken,
      userId,
    )

    if (!userToken) {
      throw new AppError('Refresh token does not exists', 401)
    }

    await this.usersTokenRepository.deleteByUserIdAndPlatform(userId, platform)

    const newToken = jwt.sign(
      {
        avatarUrl,
        name,
      },
      jwt_secret,
      {
        subject: userId,
        expiresIn: expires_in_token,
      },
    )

    const newRefreshToken = jwt.sign(
      {
        avatarUrl,
        name,
      },
      jwt_secret,
      {
        subject: userId,
        expiresIn: expires_in_refresh_token,
      },
    )

    await this.usersTokenRepository.create({
      refreshToken: newRefreshToken,
      userId,
      platform,
    })

    return {
      token: newToken,
      refreshToken: newRefreshToken,
    }
  }
}
