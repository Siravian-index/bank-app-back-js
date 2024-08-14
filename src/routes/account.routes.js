


import { Router } from "express";
import { checkAccountHandler } from "../controller/account.controller.js";
import requiredUser from "../middleware/requiredUser.js";



const router = Router()

router.get("/api/v1/account/check", requiredUser, checkAccountHandler)






export default router