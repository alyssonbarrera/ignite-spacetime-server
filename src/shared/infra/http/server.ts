import { app } from './app'

import { env } from '@/shared/env'

const PORT = env.PORT

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP server running on http://localhost:${PORT}`)
  })
