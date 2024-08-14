

import express from "express";
import { routes } from "../routes/index.js";


export function createServer() {
  const app = express()

  app.use(express.json())
  routes(app)

  return app
}