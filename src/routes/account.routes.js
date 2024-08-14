


import { Router } from "express";
import { checkAccountHandler, depositAccountHandler } from "../controller/account.controller.js";
import requiredUser from "../middleware/requiredUser.js";



const router = Router()

router.get("/api/v1/account/check", requiredUser, checkAccountHandler)
router.get("/api/v1/account/deposit", requiredUser, depositAccountHandler)







export default router