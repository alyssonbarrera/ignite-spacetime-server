import { env } from '@/shared/env'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyRequest(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestOrigin = request.headers['x-request-origin']

  if (requestOrigin && requestOrigin.includes('web')) {
    env.GITHUB_CLIENT_ID = env.GITHUB_WEB_CLIENT_ID
    env.GITHUB_CLIENT_SECRET = env.GITHUB_WEB_CLIENT_SECRET
  } else if (requestOrigin && requestOrigin.includes('mobile')) {
    env.GITHUB_CLIENT_ID = env.GITHUB_MOBILE_CLIENT_ID
    env.GITHUB_CLIENT_SECRET = env.GITHUB_MOBILE_CLIENT_SECRET
  } else {
    return reply.status(400).send({ message: 'Invalid user agent' })
  }
}
