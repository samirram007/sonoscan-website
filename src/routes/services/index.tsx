import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/services/')({
  component: lazyRouteComponent(() => import('../../features/services/ServicePage')),
})
