import { z } from 'zod'
import axios from 'axios'
import { env } from '@/shared/env'
import { User } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repository'

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
    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null, // body
      {
        params: {
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    )

    const { access_token } = accessTokenResponse.data

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })

    const userInfo = userSchema.parse(userResponse.data)

    let user = await this.usersRepository.findByGithubId(userInfo.id)

    if (!user) {
      user = await this.usersRepository.create({
        githubId: userInfo.id,
        login: userInfo.login,
        name: userInfo.name,
        avatarUrl: userInfo.avatar_url,
      })
    }

    return {
      user,
    }
  }
}
