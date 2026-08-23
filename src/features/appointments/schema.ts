import { z } from 'zod'

export const AppointmentFormSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Valid email address is required'),
  phone: z.string().min(1, 'Phone number is required'),
  notes: z.string().optional(),
})
export type AppointmentForm = z.infer<typeof AppointmentFormSchema>
