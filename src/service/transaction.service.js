

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