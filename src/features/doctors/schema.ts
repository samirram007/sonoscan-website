import { z } from 'zod'

export const DoctorEducationSchema = z.object({
  degree: z.string(),
  school: z.string(),
  year: z.string(),
})
export type DoctorEducation = z.infer<typeof DoctorEducationSchema>

export const DoctorPublicationSchema = z.object({
  title: z.string(),
  journal: z.string(),
  year: z.string(),
})
export type DoctorPublication = z.infer<typeof DoctorPublicationSchema>

export const PatientReviewSchema = z.object({
  name: z.string(),
  rating: z.number(),
  date: z.string(),
  comment: z.string(),
})
export type PatientReview = z.infer<typeof PatientReviewSchema>

export const BranchScheduleEntrySchema = z.object({
  branchId: z.string(),
  days: z.array(z.string()),
})
export type BranchScheduleEntry = z.infer<typeof BranchScheduleEntrySchema>

export const DoctorSchema = z.object({
  name: z.string(),
  initials: z.string(),
  role: z.string(),
  specialty: z.string(),
  slug: z.string(),
  branchIds: z.array(z.string()),
  branchSchedule: z.array(BranchScheduleEntrySchema),
  bio: z.string().optional(),
  education: z.array(DoctorEducationSchema).optional(),
  certifications: z.array(z.string()).optional(),
  specialties: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  availability: z.array(z.string()).optional(),
  publications: z.array(DoctorPublicationSchema).optional(),
  funFact: z.string().optional(),
  image: z.string().optional(),
  reviews: z.array(PatientReviewSchema).optional(),
})
export type Doctor = z.infer<typeof DoctorSchema>

export const TeamMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  specialty: z.string(),
  initials: z.string(),
  slug: z.string(),
  branchIds: z.array(z.string()),
  image: z.string().optional(),
})
export type TeamMember = z.infer<typeof TeamMemberSchema>

export const AppointmentDoctorSchema = z.object({
  name: z.string(),
  specialty: z.string(),
  initials: z.string(),
  available: z.array(z.string()).optional(),
  branchSchedule: z.array(BranchScheduleEntrySchema).optional(),
  branchIds: z.array(z.string()),
})
export type AppointmentDoctor = z.infer<typeof AppointmentDoctorSchema>

export const OpdSlotSchema = z.object({
  day: z.string(),
  time: z.string(),
})
export type OpdSlot = z.infer<typeof OpdSlotSchema>

export const OpdDoctorSchema = z.object({
  name: z.string(),
  qualification: z.string(),
  schedule: z.array(OpdSlotSchema),
})
export type OpdDoctor = z.infer<typeof OpdDoctorSchema>

export const OpdDepartmentGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  doctors: z.array(OpdDoctorSchema),
})
export type OpdDepartmentGroup = z.infer<typeof OpdDepartmentGroupSchema>

export const OpdAppointmentDoctorSchema = z.object({
  name: z.string(),
  specialty: z.string(),
  qualification: z.string(),
  initials: z.string(),
  branchIds: z.array(z.string()),
  branchSchedule: z.array(
    z.object({
      branchId: z.string(),
      slots: z.array(OpdSlotSchema),
    }),
  ),
})
export type OpdAppointmentDoctor = z.infer<typeof OpdAppointmentDoctorSchema>
