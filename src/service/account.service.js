
import db from "../db/Instance.js"
import { GenericError } from "../error/GenericError.js"


export async function checkAccountService(clientId) {
  const client = await db.client.findFirst({
    where: {
      id: clientId
    }
  })

  if (!client) {
    throw new GenericError({ status: 400, message: `Client ${clientId} not found`, })
  }

  if (!client.active) {
    throw new GenericError({ status: 400, message: `Client ${clientId} is not active`, })
  }

  const account = await db.account.findFirst({
    where: {
      clientId
    }
  })

  if (!account) {
    throw new GenericError({ status: 400, message: `Account not found for client ${clientId}`, })
  }

  return account
}


export async function depositAccountService(clientId, amount) {
  const client = await db.client.findFirst({
    where: {
      id: clientId
    }
  })

  if (!client) {
    throw new GenericError({ status: 400, message: `Client ${clientId} not found`, })
  }

  if (!client.active) {
    throw new GenericError({ status: 400, message: `Client ${clientId} is not active`, })
  }

  const account = await db.account.findFirst({
    where: {
      clientId
    }
  })

  if (!account) {
    throw new GenericError({ status: 400, message: `Account not found for client ${clientId}`, })
  }

  // update account where accountId and clientId match
  const newBalance = account.balance + amount
  const updatedAccount = await db.account.update({
    where: {
      clientId
    },
    data: {
      balance: newBalance
    }
  })

  return updatedAccount
}