import { User, Prisma } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>
  findAll(page: number): Promise<User[]>
  findById(id: string): Promise<User | null>
  findByGithubId(id: number): Promise<User | null>
  update(id: string, data: Prisma.UserUpdateInput): Promise<User>
  delete(id: string): Promise<void>
}
