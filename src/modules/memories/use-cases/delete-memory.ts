import { AppError } from '@/shared/errors/AppError'
import { MemoriesRepository } from '../repositories/memories-repository'

type DeleteMemoryUseCaseRequest = {
  id: string
  userId: string
}

type DeleteMemoryUseCaseResponse = {}

export class DeleteMemoryUseCase {
  constructor(private memoriesRepository: MemoriesRepository) {}

  async execute({
    id,
    userId,
  }: DeleteMemoryUseCaseRequest): Promise<DeleteMemoryUseCaseResponse> {
    console.log('id', userId)
    const memory = await this.memoriesRepository.findById(id)
    console.log('memory', memory)

    if (!memory) {
      throw new AppError('Memory not found', 404)
    }

    if (memory.userId !== userId) {
      throw new AppError('You are not allowed to delete this memory', 403)
    }

    await this.memoriesRepository.delete(id)

    return {}
  }
}
