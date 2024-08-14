

import * as dotenv from "dotenv"
import { createServer } from "./server/createServer.js";

dotenv.config()

export function main() {
  const app = createServer()
  
  app.listen(process.env.PORT, () => {
    console.log(`Running on port ::${process.env.PORT}`)
  })

}