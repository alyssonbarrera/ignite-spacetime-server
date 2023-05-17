import { AppError } from '@/shared/errors/AppError'
import { makeMemory } from '@/test/factories/make-memory'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetMemoryByIdUseCase } from '@/modules/memories/use-cases/get-memory-by-id'
import { InMemoryMemoriesRepository } from '@/test/repositories/in-memory/in-memory-memories-repository'

let inMemoryMemoriesRepository: InMemoryMemoriesRepository
let sut: GetMemoryByIdUseCase

describe('Get Memory Use Case', () => {
  beforeEach(() => {
    inMemoryMemoriesRepository = new InMemoryMemoriesRepository()
    sut = new GetMemoryByIdUseCase(inMemoryMemoriesRepository)
  })

  it('should be able to get a memory', async () => {
    const memoryData = await makeMemory()
    await inMemoryMemoriesRepository.create(memoryData)

    const { memory } = await sut.execute({ id: memoryData.id })

    expect(memory.id).toBe(memoryData.id)
    expect(memory.content).toBe(memoryData.content)
  })

  it('should not be able to get a memory if it does not exist', async () => {
    expect(async () => {
      return await sut.execute({ id: 'invalid-id' })
    }).rejects.toBeInstanceOf(AppError)
  })
})
