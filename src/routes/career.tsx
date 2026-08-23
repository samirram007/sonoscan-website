import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/career')({
  component: lazyRouteComponent(() => import('../features/career/CareerPage')),
})
