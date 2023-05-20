import { UploadUseCase } from '../use-cases/upload'

export function makeUploadUseCase() {
  const useCase = new UploadUseCase()

  return useCase
}
