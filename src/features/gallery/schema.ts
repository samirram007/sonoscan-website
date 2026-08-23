import { z } from 'zod'

export const GalleryCategorySchema = z.object({
  id: z.enum(['all', 'facilities', 'equipment', 'team', 'patient-rooms', 'waiting-area']),
  label: z.string(),
})
export type GalleryCategory = z.infer<typeof GalleryCategorySchema>
export type GalleryCategoryId = GalleryCategory['id']

export const GalleryImageSchema = z.object({
  id: z.string(),
  src: z.string(),
  alt: z.string(),
  category: GalleryCategorySchema.shape.id,
  title: z.string(),
  description: z.string(),
})
export type GalleryImage = z.infer<typeof GalleryImageSchema>

export const VirtualTourSchema = z.object({
  title: z.string(),
  description: z.string(),
  videoSrc: z.string(),
  thumbnailSrc: z.string(),
})
export type VirtualTour = z.infer<typeof VirtualTourSchema>
