


import { Router } from "express";
import validate from "../middleware/validateResource.js";
import { checkAccountHandler } from "../controller/account.controller.js";
import { checkAccountSchema } from "../schema/accountCheck.schema.js";



const router = Router()

router.get("/api/v1/account/check", validate(checkAccountSchema), checkAccountHandler)






export default router