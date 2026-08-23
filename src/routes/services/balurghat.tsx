import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/services/balurghat')({
  component: lazyRouteComponent(() => import('../../features/branches/BranchDetailPage')),
})
