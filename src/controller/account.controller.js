import { CustomError } from "../error/CustomError.js"
import { InternalServerError } from "../error/InternalServerError.js"
import { checkAccountService } from "../service/account.service.js"


export async function checkAccountHandler(req, res) {
  try {
    const account = await checkAccountService(res.locals.user.id)
    res.json({ data: account })
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.getStatus()).send(error.serialize())
    }
    console.log(error)
    const e = new InternalServerError()
    return res.status(e.getStatus()).send(e.serialize())
  }
}

export async function depositAccountHandler(req, res) {
  try {
    const account = await depositAccountService(req.query.clientId)
    res.json({ data: account })
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.getStatus()).send(error.serialize())
    }
    console.log(error)
    const e = new InternalServerError()
    return res.status(e.getStatus()).send(e.serialize())
  }
}