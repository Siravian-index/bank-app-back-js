
import z from "zod"

export const loginUserSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required"
    }).email("A valid email address is required"),
    password: z.string({
      required_error: "Password is required"
    }),
  })
})


