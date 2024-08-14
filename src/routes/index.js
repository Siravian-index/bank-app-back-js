
import userRouter from "./user.routes.js"


export function routes(app) {
  app.use(userRouter)
}