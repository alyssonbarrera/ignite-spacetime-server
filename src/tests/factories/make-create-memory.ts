import { Memory } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { prisma } from '@/shared/lib/prisma'
import { makeCreateUser } from './make-create-user'
import { makeMemory } from './make-memory'

type makeMemoryProps = {
  id?: string
  userId?: string
  override?: Partial<Memory>
  type?: 'prisma' | 'in-memory'
}

export async function makeCreateMemory({
  id,
  userId,
  override,
  type = 'in-memory',
}: makeMemoryProps = {}) {
  const user =
    type === 'prisma' && !userId
      ? await makeCreateUser({ type: 'prisma' })
      : null

  const memory = makeMemory({
    id,
    userId: userId || user?.id || randomUUID(),
    override,
  })

  if (type === 'prisma') {
    const createdMemory = prisma.memory.create({
      data: memory,
    })

    return createdMemory
  }

  return memory
}
