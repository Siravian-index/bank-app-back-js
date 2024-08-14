
import jwt from "jsonwebtoken"


export function signToken(payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    algorithm: 'RS256',
    expiresIn: '1h',
  })
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.TOKEN_SECRET)
}

export function decodeToken(token) {
  return jwt.decode(token, process.env.TOKEN_SECRET)
}