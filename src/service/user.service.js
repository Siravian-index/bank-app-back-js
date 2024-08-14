import db from "../db/Instance.js"


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
  // validate user doesn't exist first
  console.log(data)
  "SELECT * FROM user WHERE user.email = data.email OR user.cc = data.cc"
  const found = await db.user.findFirst({where: {
    email: data.email,
    OR: {
      cc: data.cc,
    }
  }})
  console.log(found)
  return db.user.findMany()
  // take password && hash it
  // save it to the db
  // return new user
  return data
}