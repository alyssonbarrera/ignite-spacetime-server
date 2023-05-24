import axios from 'axios'
import request from 'supertest'
import MockAdapter from 'axios-mock-adapter'
import { app } from '@/shared/infra/http/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const mock = new MockAdapter(axios)

describe('Authenticate Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to authenticate a user', async () => {
    const mockGithubResponse = {
      access_token: 'mocked_access_token',
    }

    mock
      .onPost('https://github.com/login/oauth/access_token')
      .reply(200, mockGithubResponse)

    mock
      .onGet('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${mockGithubResponse.access_token}`,
        },
      })
      .reply(200, {
        id: 1234567890,
        login: 'johndoe',
        name: 'John Doe',
        avatar_url: 'https://avatarurl.com',
      })

    const response = await request(app.server)
      .post('/register')
      .send({
        code: '1234567890',
      })
      .set({
        'X-Request-Origin': 'web',
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })
})
