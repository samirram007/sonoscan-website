import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/departments/')({
  component: lazyRouteComponent(() => import('../../features/departments/DepartmentsPage')),
})
