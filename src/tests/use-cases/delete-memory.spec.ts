import { AppError } from '@/shared/errors/AppError'
import { makeMemory } from '../factories/make-memory'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteMemoryUseCase } from '@/modules/memories/use-cases/delete-memory'
import { InMemoryMemoriesRepository } from '../repositories/in-memory/in-memory-memories-repository'

let inMemoryMemoriesRepository: InMemoryMemoriesRepository
let sut: DeleteMemoryUseCase

describe('Delete Memory Use Case', () => {
  beforeEach(() => {
    inMemoryMemoriesRepository = new InMemoryMemoriesRepository()
    sut = new DeleteMemoryUseCase(inMemoryMemoriesRepository)
  })

  it('should be able to delete a memory', async () => {
    const memoryData = makeMemory()
    await inMemoryMemoriesRepository.create(memoryData)

    await sut.execute({ id: memoryData.id, userId: memoryData.userId })

    expect(inMemoryMemoriesRepository.items.length).toBe(0)
  })

  it('should not be able to delete a memory if it does not exist', async () => {
    expect(async () => {
      return await sut.execute({ id: 'invalid-id', userId: 'any-user-id' })
    }).rejects.toBeInstanceOf(AppError)
  })
})
