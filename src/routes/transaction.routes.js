


import { Router } from "express";

import requiredUser from "../middleware/requiredUser.js";
import validate from "../middleware/validateResource.js";
import { checkTransactionHandler } from "../controller/transaction.controller.js";





const router = Router()

router.get("/api/v1/transactions/check", requiredUser, checkTransactionHandler)



export default router