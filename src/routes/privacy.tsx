import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy')({
  component: lazyRouteComponent(() => import('../features/legal/PrivacyPolicy')),
})
