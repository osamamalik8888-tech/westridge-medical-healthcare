import { z } from "zod";

export const appointmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name."),
  doctorSlug: z.string().min(1, "Please choose a doctor."),
  date: z.string().min(1, "Please pick a date."),
  time: z.string().min(1, "Please pick a time."),
  visitType: z.string().min(1, "Please choose a visit type."),
  complaint: z.string().trim().optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
