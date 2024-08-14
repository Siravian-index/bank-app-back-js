
import db from "../db/Instance.js"
import { GenericError } from "../error/GenericError.js"


export async function checkAccountService(clientId) {

  const account = await db.account.findFirst({
    where: {
      clientId
    }
  })

  if (!account) {
    throw new GenericError({ status: 400, message: `Account not found for client ${clientId}`, })
  }

  console.log(account)
  return account
}