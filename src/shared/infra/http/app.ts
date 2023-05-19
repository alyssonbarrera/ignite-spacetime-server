import fastify from 'fastify'
import jwt from '@fastify/jwt'
import { ZodError } from 'zod'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'

import { env } from '@/shared/env'

import { usersRoutes } from './routes/users'
import { uploadRoutes } from './routes/upload'
import { memoriesRoutes } from './routes/memories'

import { AppError } from '@/shared/errors/AppError'
import { resolve } from 'node:path'

export const app = fastify()

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '..', '..', '..', '..', 'tmp'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: true, // allow request from any origin
})

app.register(jwt, {
  secret: env.JWT_SECRET,
})

app.addHook('preHandler', async (request, reply) => {
  env.REQUEST_HOSTNAME = request.hostname
  env.REQUEST_PROTOCOL = request.protocol
})

app.register(uploadRoutes)
app.register(usersRoutes)
app.register(memoriesRoutes)

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
