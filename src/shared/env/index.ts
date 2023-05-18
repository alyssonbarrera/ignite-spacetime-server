import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GITHUB_WEB_CLIENT_ID: z.string(),
  GITHUB_WEB_CLIENT_SECRET: z.string(),
  GITHUB_MOBILE_CLIENT_ID: z.string(),
  GITHUB_MOBILE_CLIENT_SECRET: z.string(),
  JWT_SECRET: z.string().default('secret'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
