

export async function saveAccountTransaction({ type, money, ownerAccountId, recipientAccountId, db }) {
  return db.transaction.create({
    data: {
      money,
      type,
      ownerAccountId,
      recipientAccountId,
    }
  })
}