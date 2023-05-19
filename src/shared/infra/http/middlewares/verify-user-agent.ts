import { env } from '@/shared/env'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyUserAgent(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userAgent = request.headers['user-agent']

  if (userAgent && userAgent.includes('web')) {
    env.GITHUB_CLIENT_ID = env.GITHUB_WEB_CLIENT_ID
    env.GITHUB_CLIENT_SECRET = env.GITHUB_WEB_CLIENT_SECRET
  } else if (userAgent && userAgent.includes('mobile')) {
    env.GITHUB_CLIENT_ID = env.GITHUB_MOBILE_CLIENT_ID
    env.GITHUB_CLIENT_SECRET = env.GITHUB_MOBILE_CLIENT_SECRET
  } else {
    return reply.status(400).send({ message: 'Invalid user agent' })
  }
}
