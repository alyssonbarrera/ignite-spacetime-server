import { Memory } from '@prisma/client'
import { MemoriesRepository } from '../repositories/memories-repository'
import { UsersRepository } from '@/modules/users/repositories/users-repository'
import { AppError } from '@/shared/errors/AppError'

type CreateMemoryUseCaseRequest = {
  content: string
  isPublic: boolean
  coverUrl: string
  userId: string
}

type CreateMemoryUseCaseResponse = {
  memory: Memory
}

export class CreateMemoryUseCase {
  constructor(
    private memoriesRepository: MemoriesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    content,
    isPublic,
    coverUrl,
    userId,
  }: CreateMemoryUseCaseRequest): Promise<CreateMemoryUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const memory = await this.memoriesRepository.create({
      content,
      isPublic,
      coverUrl,
      userId,
    })

    return {
      memory,
    }
  }
}
