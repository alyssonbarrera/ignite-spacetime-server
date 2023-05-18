import { Memory } from '@prisma/client'

export class MemoryMinDTO {
  private id!: string
  private coverUrl!: string
  private excerpt!: string

  constructor(props: Memory) {
    this.id = props.id
    this.coverUrl = props.coverUrl
    this.excerpt = props.content.substring(0, 150) + '...'
  }

  get getId(): string {
    return this.id
  }

  get getCoverUrl(): string {
    return this.coverUrl
  }

  get getExcerpt(): string {
    return this.excerpt
  }
}
