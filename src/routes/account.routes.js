


import { Router } from "express";

import { checkAccountHandler, depositAccountHandler, transferAccountHandler, withdrawAccountHandler } from "../controller/account.controller.js";
import requiredUser from "../middleware/requiredUser.js";
import validate from "../middleware/validateResource.js";
import { depositAccountSchema } from "../schema/accountDeposit.schema.js"
import { transferAccountSchema } from "../schema/accountTransfer.schema.js"





const router = Router()

router.get("/api/v1/account/check", requiredUser, checkAccountHandler)

router.post("/api/v1/account/deposit", requiredUser, validate(depositAccountSchema), depositAccountHandler)

router.post("/api/v1/account/withdraw", requiredUser, validate(depositAccountSchema), withdrawAccountHandler)

router.post("/api/v1/account/transfer", requiredUser, validate(transferAccountSchema), transferAccountHandler)








export default router