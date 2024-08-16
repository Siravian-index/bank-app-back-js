

import express from "express";
import { routes } from "../routes/index.js";
import deserializeUser from "../middleware/deserializeUser.js";
import cors from "cors"

export function createServer() {
  const app = express()

  app.use(express.json())
  app.use(deserializeUser)

  app.use(cors({
    origin: "*",
  }))

  routes(app)

  return app
}