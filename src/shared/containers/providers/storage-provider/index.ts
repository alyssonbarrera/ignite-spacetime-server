import { LocalStorageProvider } from './implementations/local-storage-provider'

export function makeStorageProvider() {
  return new LocalStorageProvider()
}
