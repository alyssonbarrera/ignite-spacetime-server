import { Memory, Prisma } from '@prisma/client'

export interface MemoriesRepository {
  create(data: Prisma.MemoryUncheckedCreateInput): Promise<Memory>
  findAll(page: number, userId: string): Promise<Memory[]>
  findById(id: string): Promise<Memory | null>
  findByUserId(userId: string, page: number): Promise<Memory[]>
  update(id: string, data: Prisma.MemoryUpdateInput): Promise<Memory>
  delete(id: string): Promise<void>
}
