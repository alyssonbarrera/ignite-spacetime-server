import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

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
  REQUEST_PROTOCOL: z.string().default('http'),
  REQUEST_HOSTNAME: z.string().default('localhost'),
  AWS_BUCKET: z.string(),
  AWS_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  STORAGE_PROVIDER: z.enum(['local', 's3']).default('local'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
