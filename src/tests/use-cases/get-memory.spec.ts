import { AppError } from '@/shared/errors/AppError'
import { makeMemory } from '../factories/make-memory'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetMemoryByIdUseCase } from '@/modules/memories/use-cases/get-memory-by-id'
import { InMemoryMemoriesRepository } from '../repositories/in-memory/in-memory-memories-repository'

let inMemoryMemoriesRepository: InMemoryMemoriesRepository
let sut: GetMemoryByIdUseCase

describe('Get Memory Use Case', () => {
  beforeEach(() => {
    inMemoryMemoriesRepository = new InMemoryMemoriesRepository()
    sut = new GetMemoryByIdUseCase(inMemoryMemoriesRepository)
  })

  it('should be able to get a memory', async () => {
    const memoryData = makeMemory({
      userId: '401e119d-405c-4972-b75d-f8fcc6c93732',
    })
    await inMemoryMemoriesRepository.create(memoryData)

    const { memory } = await sut.execute({
      id: memoryData.id,
      userId: memoryData.userId,
    })

    expect(memory.id).toBe(memoryData.id)
    expect(memory.content).toBe(memoryData.content)
  })

  it('should not be able to get a memory if it does not exist', async () => {
    expect(async () => {
      return await sut.execute({
        id: 'invalid-id',
        userId: '401e119d-405c-4972-b75d-f8fcc6c93732',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to get a memory if it is not public and the user is not the owner', async () => {
    expect(async () => {
      const memoryData = makeMemory({
        override: {
          isPublic: false,
        },
        userId: '401e119d-405c-4972-b75d-f8fcc6c93732',
      })
      await inMemoryMemoriesRepository.create(memoryData)

      return await sut.execute({
        id: memoryData.id,
        userId: 'invalid-user-id',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
