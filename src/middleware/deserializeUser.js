import { verifyToken } from "../utils/jwt.js"


export default async function deserializeUser(req, res, next) {
  const accessToken = req.headers.authorization ?? ""
  const token = accessToken.replace(/^Bearer\s/, "")

  if (!token) {
    return next()
  }

  const { decoded, expired, valid } = verifyToken(token)
  if (valid && !expired && decoded) {
    res.locals.user = decoded
    return next()
  }

  return next()
}

