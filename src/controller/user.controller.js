import { createUserService } from "../service/user.service.js"


export async function registerUserHandler(req, res) {
  try {
    const newUser = await createUserService(req.body)
    res.json({data: newUser})
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}