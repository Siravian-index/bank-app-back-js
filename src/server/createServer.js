

import express from "express";
import { routes } from "../routes/index.js";
import deserializeUser from "../middleware/deserializeUser.js";


export function createServer() {
  const app = express()

  app.use(express.json())
  app.use(deserializeUser)

  routes(app)

  return app
}