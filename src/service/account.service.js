
import { TRANSACTION_TYPES } from "../constants/index.js"
import db from "../db/Instance.js"
import { GenericError } from "../error/GenericError.js"
import { saveAccountTransaction } from "./transaction.service.js"

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

  const result = await db.$transaction(async (tx) => {

    const updatedAccount = await tx.account.update({
      data: {
        balance: {
          increment: amount,
        },
      },
      where: {
        id: account.id,
      },
    })

    const transaction = await saveAccountTransaction({
      tx,
      money: amount,
      type: TRANSACTION_TYPES.DEPOSIT,
      ownerAccountId: updatedAccount.id,
      recipientAccountId: null,
    })

    return { updatedAccount, transaction }

  })

  return result
}


export async function withdrawAccountService(clientId, amount) {
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

  const hasResources = account.balance >= amount

  if (!hasResources) {
    throw new GenericError({ status: 400, message: `Account does not have enough money (${account.balance}) to withdraw this amount (${amount})`, })
  }

  const result = await db.$transaction(async (tx) => {

    const updatedAccount = await tx.account.update({
      data: {
        balance: {
          decrement: amount,
        },
      },
      where: {
        id: account.id,
      },
    })

    const transaction = await saveAccountTransaction({
      tx,
      money: amount,
      type: TRANSACTION_TYPES.WITHDRAW,
      ownerAccountId: updatedAccount.id,
      recipientAccountId: null,
    })

    return { updatedAccount, transaction }

  })


  return result
}


export async function transferAccountService(clientId, recipientAccountId, amount) {
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

  const hasResources = account.balance >= amount
  if (!hasResources) {
    throw new GenericError({ status: 400, message: `Account does not have enough money (${account.balance}) to transfer this amount (${amount})`, })
  }


  const recipientAccount = await db.account.findFirst({
    where: {
      id: recipientAccountId
    },
    select: {
      id: true,
      balance: true,
      client: {
        select: {
          id: true,
          active: true,
        }
      },
    }
  })


  if (!recipientAccount) {
    throw new GenericError({ status: 400, message: `Account not found for client ${clientId}`, })
  }

  if (!recipientAccount.client.active) {
    throw new GenericError({ status: 400, message: `Recipient account is not active`, })
  }

  const result = await db.$transaction(async (tx) => {
    const sender = await tx.account.update({
      data: {
        balance: {
          decrement: amount,
        },
      },
      where: {
        id: account.id,
      },
    })

    const recipient = await tx.account.update({
      data: {
        balance: {
          increment: amount,
        },
      },
      where: {
        id: recipientAccount.id,
      },
    })


    const transaction = await saveAccountTransaction({
      db: tx,
      money: amount,
      type: TRANSACTION_TYPES.TRANSFER,
      ownerAccountId: sender.id,
      recipientAccountId: recipient.id,
    })

    return { sender, recipient, transaction }
  })

  return result

}