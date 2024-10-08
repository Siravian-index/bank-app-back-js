import { CustomError } from "../error/CustomError.js"
import { InternalServerError } from "../error/InternalServerError.js"

import { createUserService, loginUserService } from "../service/user.service.js"


export async function registerUserHandler(req, res) {
  try {
    const newUser = await createUserService(req.body)
    res.json({ data: newUser })
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.getStatus()).send(error.serialize())
    }
    console.log(error)
    const e = new InternalServerError()
    return res.status(e.getStatus()).send(e.serialize())
  }
}



export async function loginUserHandler(req, res) {
  try {
    const user = await loginUserService(req.body)
    res.json({ data: user })
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.getStatus()).send(error.serialize())
    }
    console.log(error)
    const e = new InternalServerError()
    return res.status(e.getStatus()).send(e.serialize())
  }
}