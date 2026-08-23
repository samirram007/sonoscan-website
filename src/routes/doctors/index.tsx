import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/doctors/')({
  component: lazyRouteComponent(() => import('../../features/doctors/DoctorsPage')),
})
