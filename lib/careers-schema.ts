import { z } from "zod";

export const positions = [
  "Doctor",
  "Nurse",
  "Pharmacist",
  "Laboratory Staff",
  "Receptionist",
  "Administrative Staff",
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const applicationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  phone: z.string().trim().min(7, "Please enter a phone number we can reach you on."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .refine((val) => EMAIL_PATTERN.test(val), "Please enter a valid email address."),
  position: z.enum(positions),
  experience: z.string().trim().min(1, "Please give a brief idea of your experience."),
  message: z.string().trim().optional(),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;
