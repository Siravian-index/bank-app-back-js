
import jwt from "jsonwebtoken"


export function signToken(payload) {
  return jwt.sign(payload, process.env.TOKEN_PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn: '1h',
  })
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_PUBLIC_KEY)
    return {
      decoded,
      valid: true,
      expired: false,
    }
  } catch (e) {
    console.error(e.message)
    return {
      decoded: null,
      valid: false,
      expired: e.message === "jwt expired",
    }
  }
}

export function decodeToken(token) {
  return jwt.decode(token, process.env.TOKEN_PRIVATE_KEY)
}
