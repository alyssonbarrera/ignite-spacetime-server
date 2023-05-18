import request from 'supertest'
import { app } from '@/shared/infra/http/app'
import { makeCreateMemory } from '../factories/make-create-memory'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '../factories/make-create-and-authenticate'

describe('Get Memory Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a memory', async () => {
    const { token, user } = await createAndAuthenticateUser(app)

    const createdMemory = await makeCreateMemory({
      type: 'prisma',
      userId: user.sub,
    })

    const response = await request(app.server)
      .get(`/memories/${createdMemory.id}`)
      .set({
        Authorization: `Bearer ${token}`,
        'User-Agent': 'web',
      })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      memory: expect.objectContaining({
        id: expect.any(String),
      }),
    })
  })
})
