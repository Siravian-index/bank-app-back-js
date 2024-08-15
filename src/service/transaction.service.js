import { GenericError } from "../error/GenericError.js"
import db from "../db/Instance.js"


export async function saveAccountTransaction({ type, money, ownerAccountId, recipientAccountId, tx }) {
  return tx.transaction.create({
    data: {
      money,
      type,
      ownerAccountId,
      recipientAccountId,
    }
  })
}

export async function checkTransactionService(clientId) {
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
    },
  })

  if (!account) {
    throw new GenericError({ status: 400, message: `Account not found for client ${clientId}`, })
  }

  const transactions = await db.transaction.findMany({
    where: {
      ownerAccountId: account.id
    },
    orderBy: [
      { createdAt: "desc" }
    ]
  })

  return transactions
}