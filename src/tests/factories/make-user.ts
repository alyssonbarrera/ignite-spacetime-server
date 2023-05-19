import { randomUUID } from 'node:crypto'

type User = {
  id: string
  githubId: number
  name: string
  login: string
  avatarUrl: string
}

type makeUserProps = {
  id?: string
  override?: Partial<User>
}

export function makeUser({ id, override }: makeUserProps = {}) {
  const user = {
    id: id || randomUUID(),
    name: 'John Doe',
    login: 'johndoe',
    avatarUrl: 'www.avatarurl.com',
    githubId: Math.floor(Math.random() * 1000000),
    ...override,
  }

  return user
}
