import { env } from '@/shared/env'

export default {
  expires_in_token: '3d',
  expires_in_refresh_token: '7d',
  jwt_secret: env.JWT_SECRET,
}
