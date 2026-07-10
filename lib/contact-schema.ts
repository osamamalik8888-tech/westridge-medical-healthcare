import { z } from "zod";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .refine((val) => EMAIL_PATTERN.test(val), "Please enter a valid email address."),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(5, "Please add a short message."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
