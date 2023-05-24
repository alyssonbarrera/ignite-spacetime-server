import jwt from 'jsonwebtoken'
import auth from '@/config/auth'
import { User } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repository'
import { UsersTokenRepository } from '../repositories/users-token-repository'
import { makeGitHubOAuthClientProvider } from '@/shared/containers/providers/authentication-provider/factories/make-github-oauth-client-provider'

type AuthenticateUseCaseRequest = {
  code: string
}

type AuthenticateUseCaseResponse = {
  user: User
  token: string
  refreshToken: string
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private usersTokenRepository: UsersTokenRepository,
  ) {}

  async execute({
    code,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const { jwt_secret, expires_in_token, expires_in_refresh_token } = auth

    const githubProvider = makeGitHubOAuthClientProvider()

    const { user: githubUser } = await githubProvider.getAccessTokenAndUserInfo(
      code,
    )

    let user = await this.usersRepository.findByGithubId(githubUser.id)

    if (!user) {
      user = await this.usersRepository.create({
        githubId: githubUser.id,
        login: githubUser.login,
        name: githubUser.name,
        avatarUrl: githubUser.avatar_url,
      })
    }

    const token = jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      jwt_secret,
      {
        subject: user.id,
        expiresIn: expires_in_token,
      },
    )

    const refreshToken = jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      jwt_secret,
      {
        subject: user.id,
        expiresIn: expires_in_refresh_token,
      },
    )

    await this.usersTokenRepository.deleteAllByUserId(user.id)

    await this.usersTokenRepository.create({
      refreshToken,
      userId: user.id,
    })

    return {
      user,
      token,
      refreshToken,
    }
  }
}
