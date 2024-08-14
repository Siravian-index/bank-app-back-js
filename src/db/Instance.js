
import { PrismaClient } from "@prisma/client"



// class Singleton {
//   constructor() {
//     if (!Singleton.instance) {
//       Singleton.instance = new PrismaClient()
//     }
//     return Singleton.instance
//   }
// }

// const instance = new Singleton()

const instance = new PrismaClient()


export default instance