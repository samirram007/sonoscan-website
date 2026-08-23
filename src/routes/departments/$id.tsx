import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/departments/$id')({
  // Optional ?branch= search param mirrors the source site's &c=Branch so
  // branch-wise department pages are deep-linkable (e.g. /departments/pathology?branch=gangarampur).
  validateSearch: (search): { branch?: string } => ({
    branch: typeof search.branch === 'string' ? search.branch : undefined,
  }),
  component: lazyRouteComponent(() => import('../../features/departments/DepartmentDetailPage')),
})
