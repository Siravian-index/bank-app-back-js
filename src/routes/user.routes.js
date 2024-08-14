import { Router } from "express";
import { registerUserHandler } from "../controller/user.controller.js";
import validate from "../middleware/validateResource.js";
import { createUserSchema } from "../schema/createUser.schema.js";


const router = Router()


router.post("/api/v1/register", validate(createUserSchema), registerUserHandler)



export default router