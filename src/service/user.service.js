import db from "../db/Instance.js"
import { GenericError } from "../error/GenericError.js"
import { comparePasswords, hashPassword } from "../utils/hash.js"
import { signToken } from "../utils/jwt.js"



// data = createUserSchema
// {
//   id: '13123123',
//   email: 'test1@gmail.com',
//   cc: '123123123',
//   password: '21312321',
//   rol: 'STANDARD',
//   active: true
// }
export async function createUserService(data) {
  const found = await db.client.findFirst({
    where: {
      OR: [
        {
          email: data.email,
        },
        { cc: data.cc },
      ],
    }
  })

  if (found) {
    throw new GenericError({ status: 400, message: "User already register", })
  }

  const hashedPassword = await hashPassword(data.password)

  const { password, ...user } = await db.client.create({
    data: {
      email: data.email,
      cc: data.cc,
      password: hashedPassword,
      rol: data.rol,
      account: {
        create: {
          balance: 10_000
        }
      }
    }
  })

  return user

}


// {
//   email: 'test1@gmail.com',
//   password: '21312321',
// }
export async function loginUserService(data) {
  const found = await db.client.findFirst({
    where: {
      email: data.email,
    }
  })

  if (!found) {
    throw new GenericError({ status: 400, message: "User is not registered", })
  }
  const { password, ...user } = found

  const match = await comparePasswords(password, data.password)

  if (!match) {
    throw new GenericError({ status: 400, message: "Passwords do not match", })
  }

  const token = signToken(user)

  return { user, token }
}