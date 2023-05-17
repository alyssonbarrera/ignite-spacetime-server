import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { Environment } from 'vitest'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const dbFileName = `${schema}.db`
    const dbFilePath = path.join(__dirname, '..', dbFileName)

    fs.writeFileSync(dbFilePath, '')

    process.env.DATABASE_URL = `file:${dbFileName}`

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$disconnect()

        fs.unlinkSync(dbFilePath)
        fs.unlinkSync(`${dbFilePath}-journal`)
      },
    }
  },
}
