


import { Router } from "express";

import { checkAccountHandler, depositAccountHandler } from "../controller/account.controller.js";
import requiredUser from "../middleware/requiredUser.js";
import validate from "../middleware/validateResource.js";
import {depositAccountSchema} from "../schema/accountDeposit.schema.js"



const router = Router()

router.get("/api/v1/account/check", requiredUser, checkAccountHandler)
router.post("/api/v1/account/deposit", requiredUser, validate(depositAccountSchema), depositAccountHandler)







export default router