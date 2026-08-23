import { z } from 'zod'

export const BenefitSchema = z.object({
  title: z.string(),
  description: z.string(),
})
export type Benefit = z.infer<typeof BenefitSchema>

export const TestimonialSchema = z.object({
  name: z.string(),
  role: z.string(),
  text: z.string(),
  rating: z.number(),
})
export type Testimonial = z.infer<typeof TestimonialSchema>

export const StatSchema = z.object({
  value: z.string(),
  label: z.string(),
})
export type Stat = z.infer<typeof StatSchema>

export const CoreValueSchema = z.object({
  title: z.string(),
  description: z.string(),
  iconName: z.string(),
  color: z.string(),
  bg: z.string(),
  border: z.string(),
  hover: z.string(),
})
export type CoreValue = z.infer<typeof CoreValueSchema>
