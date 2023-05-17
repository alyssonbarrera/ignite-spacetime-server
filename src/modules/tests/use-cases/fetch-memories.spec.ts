import { makeMemory } from '@/test/factories/make-memory'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchMemoriesUseCase } from '@/modules/memories/use-cases/fetch-memories'
import { InMemoryMemoriesRepository } from '@/test/repositories/in-memory/in-memory-memories-repository'

let inMemoryMemoriesRepository: InMemoryMemoriesRepository
let sut: FetchMemoriesUseCase

describe('Fetch Memories Use Case', () => {
  beforeEach(() => {
    inMemoryMemoriesRepository = new InMemoryMemoriesRepository()
    sut = new FetchMemoriesUseCase(inMemoryMemoriesRepository)
  })

  it('should be able to fetch memories', async () => {
    let index = 0
    while (index < 22) {
      const memoryData = await makeMemory()
      await inMemoryMemoriesRepository.create(memoryData)
      index++
    }

    const { memories } = await sut.execute({
      page: 1,
    })

    expect(memories.length).toBe(20)
  })

  it('should be able to fetch memories in the second page', async () => {
    let index = 0
    while (index < 22) {
      const memoryData = await makeMemory()
      await inMemoryMemoriesRepository.create(memoryData)
      index++
    }

    const { memories } = await sut.execute({
      page: 2,
    })

    expect(memories.length).toBe(2)
  })
})
