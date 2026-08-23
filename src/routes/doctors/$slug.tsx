import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/doctors/$slug')({
  component: lazyRouteComponent(() => import('../../features/doctors/DoctorProfile')),
})
