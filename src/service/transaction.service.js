
import db from "../db/Instance.js"
import { GenericError } from "../error/GenericError.js"


export async function saveAccountTransaction({ type, money, clientId, recipientAccountId }) {

  const client = db.client.findFirst({
    where: {
      id: clientId,
    }
  })
  if (!client) {
    throw new GenericError({ status: 400, message: `Client ${clientId} not found`, })
  }

  if (!client.active) {
    throw new GenericError({ status: 400, message: `Client ${clientId} is not active`, })
  }

  const recipientAccount = db.account.findFirst({
    where: {
      id: recipientAccountId,
    }
  })

  const recipient = db.client.findFirst({
    where: {
      id: recipientAccountId,
    }
  })

  
}