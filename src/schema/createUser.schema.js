

import z from "zod"

export const createUserSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email is required"
        }).email("A valid email address is required"),
        cc: z.string({
            required_error: "CC is required"
        }),
        password: z.string({
            required_error: "Password is required"
        }),
        rol: z.string({
            required_error: "Rol is required"
        }),
    })
})


