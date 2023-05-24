import { env } from '@/shared/env'
import { S3StorageProvider } from './implementations/s3-storage-provider'
import { MockStorageProvider } from '@/tests/mocks/mock-storage-provider'
import { LocalStorageProvider } from './implementations/local-storage-provider'

export function makeStorageProvider() {
  if (env.NODE_ENV === 'test') {
    return new MockStorageProvider()
  }

  const storage = env.STORAGE_PROVIDER

  switch (storage) {
    case 'local':
      return new LocalStorageProvider()
    case 's3':
      return new S3StorageProvider()
  }
}
