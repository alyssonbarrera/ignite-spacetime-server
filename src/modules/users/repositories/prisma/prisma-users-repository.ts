import { prisma } from '@/shared/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '@/modules/users/repositories/users-repository'

const ITEMS_PER_PAGE = 20

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findAll(page: number): Promise<User[]> {
    const users = await prisma.user.findMany({
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    })

    return users
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByGithubId(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        githubId: id,
      },
    })

    return user
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    })

    return user
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
