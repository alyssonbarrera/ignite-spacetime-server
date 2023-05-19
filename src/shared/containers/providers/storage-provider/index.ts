import { LocalStorageProvider } from './implementations/local-storage-provider'

export function makeLocalStorageProvider() {
  const storageProvider = new LocalStorageProvider()

  return storageProvider
}
