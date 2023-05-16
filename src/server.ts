import fastify from 'fastify'

import { env } from './env'
import { PrismaClient } from '@prisma/client'

const app = fastify()
const prisma = new PrismaClient()

const PORT = env.PORT

app.get('/users', async () => {
  const users = await prisma.user.findMany()
  return users
})

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP server running on http://localhost:${PORT}`)
  })
