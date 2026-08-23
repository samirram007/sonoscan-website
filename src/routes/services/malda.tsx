import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/services/malda')({
  component: lazyRouteComponent(() => import('../../features/branches/BranchDetailPage')),
})
