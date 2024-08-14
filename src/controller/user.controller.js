import { CustomError } from "../error/CustomError.js"
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
    if (error instanceof CustomError) {
      return res.status(error.getStatus()).send(error.serialize())
    }
    const e = new InternalServerError()
    return res.status(e.getStatus()).send(e.serialize())
  }
}