import { Memory } from '@prisma/client'
import { randomUUID } from 'node:crypto'

type makeMemoryProps = {
  id?: string
  userId?: string
  override?: Partial<Memory>
}

export function makeMemory({ id, userId, override }: makeMemoryProps = {}) {
  const memory = {
    id: id || randomUUID(),
    userId: userId || randomUUID(),
    content: 'Memory Content',
    coverUrl: 'www.coverurl.com',
    isPublic: false,
    createdAt: new Date(),
    ...override,
  }

  return memory
}
