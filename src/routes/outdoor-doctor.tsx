import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/outdoor-doctor')({
  component: lazyRouteComponent(() => import('../features/outdoor/OutdoorDoctorPage')),
})
