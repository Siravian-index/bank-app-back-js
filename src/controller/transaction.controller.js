import { checkTransactionService } from "../service/transaction.service.js"


export async function checkTransactionHandler(req, res) {
  try {
    const transactions = await checkTransactionService(res.locals.user.id)
    res.json({ data: transactions })
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.getStatus()).send(error.serialize())
    }
    console.log(error)
    const e = new InternalServerError()
    return res.status(e.getStatus()).send(e.serialize())
  }
}