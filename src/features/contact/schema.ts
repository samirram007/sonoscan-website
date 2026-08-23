import { z } from 'zod'

export const DepartmentContactSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string(),
})
export type DepartmentContact = z.infer<typeof DepartmentContactSchema>

export const FAQSchema = z.object({
  q: z.string(),
  a: z.string(),
})
export type FAQ = z.infer<typeof FAQSchema>

export const ContactFormSchema = z.object({
  name: z.string().min(1, 'Your name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().min(1, 'Company name is required'),
  message: z.string().min(1, 'Please enter a message').min(10, 'Message must be at least 10 characters'),
})
export type ContactForm = z.infer<typeof ContactFormSchema>

export const OtherUnitSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string().optional(),
  website: z.string().optional(),
  whatsapp: z.string().optional(),
  description: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
})
export type OtherUnit = z.infer<typeof OtherUnitSchema>
