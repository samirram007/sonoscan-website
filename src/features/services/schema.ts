import { z } from 'zod'

export const PricingPlanSchema = z.object({
  plan: z.string(),
  price: z.string(),
  note: z.string(),
})
export type PricingPlan = z.infer<typeof PricingPlanSchema>

export const ServiceSchema = z.object({
  id: z.string(),
  icon: z.string(),
  title: z.string(),
  tagline: z.string(),
  description: z.string().optional(),
  details: z.array(z.string()).optional(),
  pricing: z.array(PricingPlanSchema),
  doctors: z.array(z.string()),
})
export type Service = z.infer<typeof ServiceSchema>

export const ServiceCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
})
export type ServiceCard = z.infer<typeof ServiceCardSchema>

