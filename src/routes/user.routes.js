import { Router } from "express";
import { registerUserHandler } from "../controller/user.controller.js";


const router = Router()


router.post("/api/v1/register", registerUserHandler)



export default router