
import z from "zod"

export const depositAccountSchema = z.object({
  body: z.object({
    amount: z.number({
      required_error: "amount is required"
    })
      .min(1_000, "Min value is 1.000")
  })
})


