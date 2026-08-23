import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/services/kolkata')({
  component: lazyRouteComponent(() => import('../../features/branches/BranchDetailPage')),
})
