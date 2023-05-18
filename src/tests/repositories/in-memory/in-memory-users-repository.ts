import { randomUUID } from 'node:crypto'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '@/modules/users/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    const user = {
      id: randomUUID() || data.id,
      ...data,
    }

    this.items.push(user)

    return user
  }

  async findAll(page: number): Promise<User[]> {
    const users = this.items.slice((page - 1) * 20, page * 20)

    return users
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    return user || null
  }

  async findByGithubId(id: number): Promise<User | null> {
    const user = this.items.find((item) => item.githubId === id)

    return user || null
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      throw new Error('User not found')
    }

    const updatedUser = {
      ...user,
      ...(data as Partial<User>),
    }

    const index = this.items.findIndex((item) => item.id === id)

    this.items[index] = updatedUser

    return updatedUser
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id)
  }
}
