import { User } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repository'
import { makeGitHubOAuthClientProvider } from '@/shared/containers/providers/authentication-provider/factories/make-github-oauth-client-provider'

type AuthenticateUseCaseRequest = {
  code: string
}

type AuthenticateUseCaseResponse = {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    code,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
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

    return {
      user,
    }
  }
}
