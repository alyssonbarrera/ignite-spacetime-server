import request from 'supertest'
import { app } from '@/shared/infra/http/app'
import { makeCreateMemory } from '../factories/make-create-memory'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '../factories/make-create-and-authenticate'

describe('Fetch Memories Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch memories', async () => {
    const { token, user } = await createAndAuthenticateUser(app)

    let index = 0
    while (index < 22) {
      await makeCreateMemory({
        type: 'prisma',
        userId: user.sub,
      })
      index++
    }

    const response = await request(app.server)
      .get(`/memories`)
      .query({
        page: 1,
      })
      .set({
        Authorization: `Bearer ${token}`,
        'X-Request-Origin': 'web',
      })

    expect(response.status).toBe(200)
    expect(response.body.memories.length).toBe(20)
    expect(response.body).toEqual({
      memories: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
        }),
      ]),
    })
  })
})
