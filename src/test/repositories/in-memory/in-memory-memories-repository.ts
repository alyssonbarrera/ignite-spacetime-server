import { randomUUID } from 'node:crypto'
import { Prisma, Memory } from '@prisma/client'
import { MemoriesRepository } from '@/modules/memories/repositories/memories-repository'

export class InMemoryMemoriesRepository implements MemoriesRepository {
  public items: Memory[] = []

  async create(data: Prisma.MemoryUncheckedCreateInput): Promise<Memory> {
    const memory = {
      id: randomUUID() || data.id,
      ...data,
      isPublic: false,
      createdAt: new Date(),
    }

    this.items.push(memory)

    return memory
  }

  async findAll(page: number): Promise<Memory[]> {
    const memories = this.items.slice((page - 1) * 20, page * 20)

    return memories
  }

  async findById(id: string): Promise<Memory | null> {
    const memory = this.items.find((item) => item.id === id)

    return memory || null
  }

  async update(id: string, data: Prisma.MemoryUpdateInput): Promise<Memory> {
    const memory = this.items.find((item) => item.id === id)

    if (!memory) {
      throw new Error('Memory not found')
    }

    const updatedMemory = {
      ...memory,
      content: (data.content || memory.content) as string,
      coverUrl: (data.coverUrl || memory.coverUrl) as string,
      isPublic: (data.isPublic || memory.isPublic) as boolean,
    }

    const index = this.items.findIndex((item) => item.id === id)

    this.items[index] = updatedMemory

    return updatedMemory
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id)
  }
}
