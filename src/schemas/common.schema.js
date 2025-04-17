import { z } from "zod";

export const nameSchema = z
  .string()
  .trim()
  .min(2, "UserName must be atleast 2 characters")
  .max(20, "UserName must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "UserName must not contain special character");
