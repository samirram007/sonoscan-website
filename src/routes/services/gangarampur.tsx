import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/services/gangarampur')({
  component: lazyRouteComponent(() => import('../../features/branches/BranchDetailPage')),
})
