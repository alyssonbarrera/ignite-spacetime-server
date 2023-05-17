import fastify from 'fastify'
import cors from '@fastify/cors'

import { ZodError } from 'zod'
import { env } from '@/shared/env'

import { memoriesRoutes } from './routes/memories'
import { AppError } from '@/shared/errors/AppError'

export const app = fastify()

app.register(cors, {
  origin: true, // allow request from any origin
})

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
