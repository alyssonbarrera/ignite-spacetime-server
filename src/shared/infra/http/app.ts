import fastify from 'fastify'
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'

import { ZodError } from 'zod'
import { env } from '@/shared/env'

import { usersRoutes } from './routes/users'
import { memoriesRoutes } from './routes/memories'
import { AppError } from '@/shared/errors/AppError'

export const app = fastify()

app.register(cors, {
  origin: true, // allow request from any origin
})

app.register(jwt, {
  secret: env.JWT_SECRET,
})

app.addHook('onRequest', async (request, reply) => {
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
})

app.register(memoriesRoutes)
app.register(usersRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  } else {
    // TODO: Here we should log to on external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
