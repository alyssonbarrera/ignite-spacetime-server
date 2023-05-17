import { beforeEach, describe, expect, it } from 'vitest'
import { CreateMemoryUseCase } from '@/modules/memories/use-cases/create-memory'
import { InMemoryMemoriesRepository } from '@/test/repositories/in-memory/in-memory-memories-repository'

let inMemoryMemoriesRepository: InMemoryMemoriesRepository
let sut: CreateMemoryUseCase

describe('Create Memory Use Case', () => {
  beforeEach(() => {
    inMemoryMemoriesRepository = new InMemoryMemoriesRepository()
    sut = new CreateMemoryUseCase(inMemoryMemoriesRepository)
  })

  it('should be able to create a memory', async () => {
    const memoryData = {
      content: 'Memory Content',
      coverUrl: 'www.coverurl.com',
      isPublic: false,
    }

    const { memory } = await sut.execute(memoryData)

    expect(memory.id).toBeDefined()
    expect(memory.content).toBe(memoryData.content)
  })
})
