import request from 'supertest'
import { app } from '@/shared/infra/http/app'
import { makeCreateMemory } from '../factories/make-create-memory'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '../factories/make-create-and-authenticate'

describe('Delete Memory Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it.only('should be able to delete a memory', async () => {
    const { token, user } = await createAndAuthenticateUser(app)

    const createdMemory = await makeCreateMemory({
      type: 'prisma',
      userId: user.sub,
    })

    const response = await request(app.server)
      .delete(`/memories/${createdMemory.id}`)
      .set({
        Authorization: `Bearer ${token}`,
        'X-Request-Origin': 'web',
      })

    expect(response.status).toBe(204)
  })
})
