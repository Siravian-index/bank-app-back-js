import bcrypt from "bcrypt"



export function hashPassword(password) {
  const saltRounds = 10
  return bcrypt.hash(password, saltRounds)
}

export function comparePasswords(hashedPassword, plainTextPassword) {
  return bcrypt.compare(plainTextPassword, hashedPassword,)
}