import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/services/$id')({
  component: lazyRouteComponent(() => import('../../features/services/ServiceDetailPage')),
})
