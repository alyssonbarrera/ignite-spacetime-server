import { AppError } from '@/shared/errors/AppError'
import { MemoriesRepository } from '../repositories/memories-repository'

type DeleteMemoryUseCaseRequest = {
  id: string
}

type DeleteMemoryUseCaseResponse = {}

export class DeleteMemoryUseCase {
  constructor(private memoriesRepository: MemoriesRepository) {}

  async execute({
    id,
  }: DeleteMemoryUseCaseRequest): Promise<DeleteMemoryUseCaseResponse> {
    const memory = await this.memoriesRepository.findById(id)

    if (!memory) {
      throw new AppError('Memory not found', 404)
    }

    await this.memoriesRepository.delete(id)

    return {}
  }
}
