import { makeMemory } from '../factories/make-memory'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchMemoriesUseCase } from '@/modules/memories/use-cases/fetch-memories'
import { InMemoryMemoriesRepository } from '../repositories/in-memory/in-memory-memories-repository'

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
      const memoryData = makeMemory({
        userId: '401e119d-405c-4972-b75d-f8fcc6c93732',
      })
      await inMemoryMemoriesRepository.create(memoryData)
      index++
    }

    const { memories } = await sut.execute({
      page: 1,
      userId: '401e119d-405c-4972-b75d-f8fcc6c93732',
    })

    expect(memories.length).toBe(20)
    expect(memories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          coverUrl: expect.any(String),
          excerpt: expect.any(String),
        }),
      ]),
    )
  })

  it('should be able to fetch memories in the second page', async () => {
    let index = 0
    while (index < 22) {
      const memoryData = makeMemory({
        userId: '401e119d-405c-4972-b75d-f8fcc6c93732',
      })
      await inMemoryMemoriesRepository.create(memoryData)
      index++
    }

    const { memories } = await sut.execute({
      page: 2,
      userId: '401e119d-405c-4972-b75d-f8fcc6c93732',
    })

    expect(memories.length).toBe(2)
  })
})
