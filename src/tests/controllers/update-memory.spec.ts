import request from 'supertest'
import { app } from '@/shared/infra/http/app'
import { makeMemory } from '../factories/make-memory'
import { makeCreateMemory } from '../factories/make-create-memory'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '../factories/make-create-and-authenticate'

describe('Update Memory Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to update a memory', async () => {
    const { token, user } = await createAndAuthenticateUser(app)

    const createdMemory = await makeCreateMemory({
      type: 'prisma',
      userId: user.sub,
    })

    const data = makeMemory({ override: { content: 'Updated Content' } })

    const response = await request(app.server)
      .put(`/memories/${createdMemory.id}`)
      .send({
        content: data.content,
      })
      .set({
        Authorization: `Bearer ${token}`,
        'X-Request-Origin': 'web',
      })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      memory: expect.objectContaining({
        id: expect.any(String),
        content: data.content,
      }),
    })
  })
})
