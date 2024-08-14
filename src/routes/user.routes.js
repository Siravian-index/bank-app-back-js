import { Router } from "express";
import { loginUserHandler, registerUserHandler } from "../controller/user.controller.js";
import validate from "../middleware/validateResource.js";
import { createUserSchema } from "../schema/createUser.schema.js";
import { loginUserSchema } from "../schema/loginUser.schema.js";



const router = Router()


router.post("/api/v1/register", validate(createUserSchema), registerUserHandler)

router.post("/api/v1/login", validate(loginUserSchema), loginUserHandler)




export default router