
// import { main } from "./src/app.js";

// main()

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {

  // const transaction = await prisma.transaction.create({
  //   data: {
  //     type: "DEPOSIT",
  //     money: 10_000,
  //     accountId: "90613b30-48a1-4bbb-b7b8-72c5b022a1f4"
  //   }
  // })
  // console.log(transaction)

  // await prisma.client.create({
  //   data: {
  //     email: "test02@gmail.com",
  //     cc: "345345345",
  //     password: "blablabal",
  //     rol: "STANDARD",
  //     active: true,
  //     account: {
  //       create: {
  //         balance: 20_000,
  //       }
  //     }
  //   }
  // })



  const allUsers = await prisma.client.findMany()
  console.log(allUsers)
}

main()