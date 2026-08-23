import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/appointments')({
  component: lazyRouteComponent(() => import('../features/appointments/AppointmentsPage')),
})
