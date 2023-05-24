export class MockStorageProvider {
  async saveFile(): Promise<string> {
    return 'www.mocked-file-url.com'
  }

  async deleteFile(): Promise<void> {}
}
