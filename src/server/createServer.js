

import express from "express";
import { routes } from "../routes/index.js";


export function createServer() {
  const app = express()

  routes(app)

  return app
}