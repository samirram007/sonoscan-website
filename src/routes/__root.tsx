import { createRootRoute, Link } from '@tanstack/react-router'
import RootLayout from '../features/ui/Layout'
import PageFallback from '../features/ui/PageFallback'

export const Route = createRootRoute({
  component: RootLayout,
  pendingComponent: PageFallback,
  pendingMs: 200,
  pendingMinMs: 300,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Page Not Found</h1>
        <p className="text-slate-500 mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  ),
})
