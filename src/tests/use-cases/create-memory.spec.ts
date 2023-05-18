import { makeUser } from '../factories/make-user'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateMemoryUseCase } from '@/modules/memories/use-cases/create-memory'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { InMemoryMemoriesRepository } from '../repositories/in-memory/in-memory-memories-repository'

let inMemoryMemoriesRepository: InMemoryMemoriesRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: CreateMemoryUseCase

describe('Create Memory Use Case', () => {
  beforeEach(() => {
    inMemoryMemoriesRepository = new InMemoryMemoriesRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new CreateMemoryUseCase(
      inMemoryMemoriesRepository,
      inMemoryUsersRepository,
    )
  })

  it('should be able to create a memory', async () => {
    const user = makeUser()

    await inMemoryUsersRepository.create(user)

    const memoryData = {
      content: 'Memory Content',
      coverUrl: 'www.coverurl.com',
      isPublic: false,
      userId: user.id,
    }

    const { memory } = await sut.execute(memoryData)

    expect(memory.id).toBeDefined()
    expect(memory.content).toBe(memoryData.content)
  })
})
