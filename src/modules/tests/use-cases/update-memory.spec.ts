import { AppError } from '@/shared/errors/AppError'
import { makeMemory } from '@/test/factories/make-memory'
import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateMemoryUseCase } from '@/modules/memories/use-cases/update-memory'
import { InMemoryMemoriesRepository } from '@/test/repositories/in-memory/in-memory-memories-repository'

let inMemoryMemoriesRepository: InMemoryMemoriesRepository
let sut: UpdateMemoryUseCase

describe('Update Memory Use Case', () => {
  beforeEach(() => {
    inMemoryMemoriesRepository = new InMemoryMemoriesRepository()
    sut = new UpdateMemoryUseCase(inMemoryMemoriesRepository)
  })

  it('should be able to get a memory', async () => {
    const memoryData = await makeMemory()
    await inMemoryMemoriesRepository.create(memoryData)

    const updatedMemoryData = {
      content: 'Updated Memory Content',
      coverUrl: 'www.updatedcoverurl.com',
      isPublic: true,
    }

    const { memory } = await sut.execute({
      id: memoryData.id,
      ...updatedMemoryData,
    })

    expect(memory.id).toBe(memoryData.id)
    expect(memory.content).toBe(updatedMemoryData.content)
    expect(memory.coverUrl).toBe(updatedMemoryData.coverUrl)
    expect(memory.isPublic).toBe(updatedMemoryData.isPublic)

    expect(memory.content).not.toBe(memoryData.content)
    expect(memory.coverUrl).not.toBe(memoryData.coverUrl)
    expect(memory.isPublic).not.toBe(memoryData.isPublic)
  })

  it('should not be able to get a memory if it does not exist', async () => {
    expect(async () => {
      return await sut.execute({
        id: 'invalid-id',
        content: 'Updated Memory Content',
        coverUrl: 'www.updatedcoverurl.com',
        isPublic: true,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
