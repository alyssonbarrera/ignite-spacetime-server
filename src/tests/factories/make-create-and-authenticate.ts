import 'dotenv/config'
import axios from 'axios'
import request from 'supertest'
import { FastifyInstance } from 'fastify'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)

type DecodedToken = {
  name: string
  avatarUrl: string
  sub: string
  iat: number
  exp: number
}

export async function createAndAuthenticateUser(app: FastifyInstance) {
  const mockGithubResponse = {
    access_token: 'mocked_access_token',
  }

  mock
    .onPost('https://github.com/login/oauth/access_token')
    .reply(200, mockGithubResponse)

  // Mock para a rota de obtenção do usuário
  mock
    .onGet('https://api.github.com/user', {
      headers: {
        Authorization: 'Bearer mocked_access_token',
      },
    })
    .reply(200, {
      id: 1234567890,
      login: 'johndoe',
      name: 'John Doe',
      avatar_url: 'https://avatarurl.com',
    })

  const authResponse = await request(app.server)
    .post('/register')
    .send({
      code: '1234567890',
    })
    .set({
      'User-Agent': 'web',
    })

  const { token } = authResponse.body

  const decodedToken = app.jwt.decode(token)

  return {
    token,
    user: decodedToken as DecodedToken,
  }
}
