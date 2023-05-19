import { randomUUID } from 'node:crypto'

type Memory = {
  id: string
  userId: string
  coverUrl: string
  content: string
  isPublic: boolean
  createdAt: Date
}

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
