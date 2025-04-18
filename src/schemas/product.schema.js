import { z } from "zod";
import { nameSchema } from "./common.schema.js";
export const titleSchema = z.object({
  content: z
    .string()
    .trim()
    .min(3, { message: "Content must be at least of 3 characters" })
    .max(100, { message: "Content must be no longer than 100 characters" }),
});

export const descriptionSchema = z.object({
  content: z
    .string()
    .trim()
    .min(10, { message: "Content must be at least of 10 characters" }),
});

export const bidSchema = z.object({
  amount: z.coerce
    .number()
    .min(1, { message: "Bid amount must be greater than 0." }),
});

export const productSchema = z.object({
  name: nameSchema,
  title: titleSchema.shape.content,
  description: descriptionSchema.shape.content,
});
