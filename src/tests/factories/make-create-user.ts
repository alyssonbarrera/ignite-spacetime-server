import { User } from '@prisma/client'
import { makeUser } from './make-user'
import { prisma } from '@/shared/lib/prisma'

type makeUserProps = {
  id?: string
  override?: Partial<User>
  type?: 'prisma' | 'in-memory'
}

export async function makeCreateUser({
  id,
  override,
  type = 'in-memory',
}: makeUserProps = {}) {
  const user = makeUser({ id, override })

  if (type === 'prisma') {
    const createdUser = prisma.user.create({
      data: user,
    })

    return createdUser
  }

  return user
}
