import { Memory } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export async function makeMemory(id?: string, override?: Partial<Memory>) {
  const memory = {
    id: id || randomUUID(),
    userId: 'c50e69c2-f45d-11ed-a05b-0242ac120003',
    content: 'Memory Content',
    coverUrl: 'www.coverurl.com',
    isPublic: false,
    createdAt: new Date(),
    ...override,
  }

  return memory
}
