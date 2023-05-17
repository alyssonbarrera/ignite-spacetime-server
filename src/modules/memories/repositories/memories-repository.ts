import { Memory, Prisma } from '@prisma/client'

export interface MemoriesRepository {
  create(data: Prisma.MemoryUncheckedCreateInput): Promise<Memory>
  findAll(page: number): Promise<Memory[]>
  findById(id: string): Promise<Memory | null>
  update(id: string, data: Prisma.MemoryUpdateInput): Promise<Memory>
  delete(id: string): Promise<void>
}
