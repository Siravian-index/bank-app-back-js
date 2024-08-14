import { createUserService } from "../service/user.service.js"


export async function registerUserHandler(req, res) {
  // req.body = createUserSchema
  try {
    // validate user doesn't exist first
    // take password && hash it
    // save it to the db
    // return new user
    const newUser = await createUserService(req.body)
    res.json({data: newUser})
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}