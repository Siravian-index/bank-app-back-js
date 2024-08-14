
import userRouter from "./user.routes.js"
import accountRouter from "./account.routes.js"

export function routes(app) {
  app.use(userRouter)
  app.use(accountRouter)
}