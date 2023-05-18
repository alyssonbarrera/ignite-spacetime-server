import request from 'supertest'
import { app } from '@/shared/infra/http/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '../factories/make-create-and-authenticate'

describe('Create Memory Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a memory', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/memories')
      .send({
        content: 'Memory Content',
        coverUrl: 'www.coverurl.com',
        isPublic: false,
      })
      .set({
        Authorization: `Bearer ${token}`,
        'User-Agent': 'web',
      })

    expect(response.status).toBe(201)
  })
})
