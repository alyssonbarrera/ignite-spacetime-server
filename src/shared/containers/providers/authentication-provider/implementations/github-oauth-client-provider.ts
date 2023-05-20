import { z } from 'zod'
import axios from 'axios'
import { env } from '@/shared/env'

type GitHubAccessTokenResponse = {
  access_token: string
}

type GitHubUserInfo = {
  id: number
  login: string
  name: string
  avatar_url: string
}

type GitHubUserInfoResponse = {
  user: GitHubUserInfo
}

export class GitHubOAuthClientProvider {
  async getAccessToken(code: string): Promise<GitHubAccessTokenResponse> {
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

    return {
      access_token,
    }
  }

  async getUserInfo(accessToken: string): Promise<GitHubUserInfoResponse> {
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })

    const user = userSchema.parse(userResponse.data)

    return {
      user,
    }
  }

  async getAccessTokenAndUserInfo(
    code: string,
  ): Promise<GitHubAccessTokenResponse & GitHubUserInfoResponse> {
    const accessTokenResponse = await this.getAccessToken(code)

    const userInfoResponse = await this.getUserInfo(
      accessTokenResponse.access_token,
    )

    return {
      ...accessTokenResponse,
      ...userInfoResponse,
    }
  }
}
