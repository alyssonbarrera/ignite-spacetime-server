import { prisma } from '@/shared/lib/prisma'
import { Prisma, Memory } from '@prisma/client'
import { MemoriesRepository } from '../memories-repository'

const ITEMS_PER_PAGE = 20

export class PrismaMemoriesRepository implements MemoriesRepository {
  async create(data: Prisma.MemoryUncheckedCreateInput): Promise<Memory> {
    const memory = await prisma.memory.create({
      data,
    })

    return memory
  }

  async findAll(page: number): Promise<Memory[]> {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    })

    return memories
  }

  async findById(id: string): Promise<Memory | null> {
    const memory = await prisma.memory.findUnique({
      where: {
        id,
      },
    })

    return memory
  }

  async update(id: string, data: Prisma.MemoryUpdateInput): Promise<Memory> {
    const memory = await prisma.memory.update({
      where: {
        id,
      },
      data,
    })

    return memory
  }

  async delete(id: string): Promise<void> {
    await prisma.memory.delete({
      where: {
        id,
      },
    })
  }
}
