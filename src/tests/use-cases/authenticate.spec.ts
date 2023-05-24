import 'dotenv/config'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { makeUser } from '../factories/make-user'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from '@/modules/users/use-cases/authenticate'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { InMemoryUsersTokenRepository } from '../repositories/in-memory/in-memory-users-token-repository'

const mock = new MockAdapter(axios)

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryUsersTokenRepository: InMemoryUsersTokenRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryUsersTokenRepository = new InMemoryUsersTokenRepository()
    sut = new AuthenticateUseCase(
      inMemoryUsersRepository,
      inMemoryUsersTokenRepository,
    )
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

    const createdUser = makeUser({
      override: {
        avatarUrl: 'https://avatarurl.com',
        githubId: 1234567890,
        name: 'John Doe',
        login: 'johndoe',
      },
    })

    await inMemoryUsersRepository.create(createdUser)

    const { user } = await sut.execute({
      code: '1234567890',
    })

    expect(user).toBeDefined()
    expect(user.id).toBe(createdUser.id)
    expect(user.name).toBe(createdUser.name)
  })
})
