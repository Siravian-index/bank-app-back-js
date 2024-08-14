
import z from "zod"

export const checkAccountSchema = z.object({
  query: z.object({
    clientId: z.string({
      required_error: "clientId is required"
    })
  })
})


