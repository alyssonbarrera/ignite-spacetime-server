import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (error: any) {
    return reply.status(401).send({ message: error.message })
  }
}

export async function optionalVerifyJWT(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (request.headers.authorization) {
    try {
      await request.jwtVerify()
    } catch (error: any) {
      return reply.status(401).send({ message: error.message })
    }
  }
}
