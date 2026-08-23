import { Link } from '@tanstack/react-router'
import SEO from '../ui/SEO'
import Reveal from '../ui/Reveal'

const lastUpdated = 'January 1, 2026'

const cookieTypes = [
  {
    category: 'Essential Cookies',
    description: 'These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt out of these cookies.',
    examples: ['Session cookies', 'CSRF tokens', 'Authentication cookies'],
    required: true,
  },
  {
    category: 'Analytics Cookies',
    description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and user experience.',
    examples: ['Page visit tracking', 'Click path analysis', 'Time spent on pages'],
    required: false,
  },
  {
    category: 'Functional Cookies',
    description: 'These cookies enable enhanced functionality and personalization, such as remembering your preferences and branch selection. They may be set by us or by third-party providers whose services we have added to our pages.',
    examples: ['Branch location preference', 'Language preference', 'Saved form data'],
    required: false,
  },
  {
    category: 'Marketing Cookies',
    description: 'These cookies are used to deliver relevant advertisements and track the effectiveness of our marketing campaigns. They may be set through our site by our advertising partners.',
    examples: ['Ad performance tracking', 'Retargeting pixels', 'Social media sharing'],
    required: false,
  },
]

export default function CookiePolicyPage() {
  return (
    <>
      <SEO
        title="Cookie Policy | Sonoscan Healthcare"
        description="Learn about how Sonoscan Healthcare uses cookies and similar tracking technologies on our website."
      />
      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-900 -mt-16 lg:-mt-28 pt-16 lg:pt-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-white/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-white/10 rounded-full blur-2xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
              Legal
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-4">
              Cookie Policy
            </h1>
            <p className="text-lg text-emerald-200/80 max-w-xl">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Content ═══ */}
      <section className="py-16 lg:py-24 bg-bg-base">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal direction="up">
            <div className="bg-bg-card rounded-2xl border border-violet-200 p-8 lg:p-10 mb-8">
              <p className="text-slate-600 leading-relaxed mb-4">
                This Cookie Policy explains what cookies are, how Sonoscan Healthcare uses them, and your choices regarding their use. By continuing to browse our website, you consent to the use of cookies as described in this policy.
              </p>
              <p className="text-slate-600 leading-relaxed">
                If you have any questions about our use of cookies, please contact us at{' '}
                <a href="mailto:info@sonoscanhealthcare.com" className="text-violet-600 hover:text-violet-700 transition-colors">
                  info@sonoscanhealthcare.com
                </a>.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up">
            <div className="bg-bg-card rounded-2xl border border-violet-200 p-8 lg:p-10 mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">What Are Cookies?</h2>
              <p className="text-slate-600 leading-relaxed">
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently, enhance user experience, and provide information to website owners. Cookies can be "session" cookies (which are deleted when you close your browser) or "persistent" cookies (which remain on your device for a set period).
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={80}>
            <div className="bg-bg-card rounded-2xl border border-violet-200 p-8 lg:p-10 mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Types of Cookies We Use</h2>
              <div className="space-y-6">
                {cookieTypes.map((type) => (
                  <div key={type.category} className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-slate-900">{type.category}</h3>
                      <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${
                        type.required
                          ? 'bg-violet-100 text-violet-700 border border-violet-200'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>
                        {type.required ? 'Always Active' : 'Optional'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{type.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {type.examples.map((example) => (
                        <span key={example} className="text-xs text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={160}>
            <div id="how-to-control" className="bg-bg-card rounded-2xl border border-violet-200 p-8 lg:p-10 mb-6 scroll-mt-32">
              <h2 className="text-xl font-bold text-slate-900 mb-4">How to Control Cookies</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You have the right to choose whether to accept or reject cookies. You can exercise your cookie preferences by:
              </p>
              <ul className="space-y-3 text-slate-600">
                {[
                  'Adjusting your browser settings to block or delete cookies (instructions are typically found in your browser\'s "Help" section)',
                  'Using our cookie consent banner (displayed on your first visit) to manage your preferences',
                  'Using browser privacy features such as "Do Not Track" or "Incognito Mode"',
                  'Installing browser extensions that give you more control over cookies and tracking',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-violet-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal direction="up" delay={240}>
            <div className="bg-bg-card rounded-2xl border border-violet-200 p-8 lg:p-10 mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Browser Settings</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings. Below are links to instructions for common browsers:
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'Google Chrome', url: '#' },
                  { name: 'Mozilla Firefox', url: '#' },
                  { name: 'Safari', url: '#' },
                  { name: 'Microsoft Edge', url: '#' },
                ].map((browser) => (
                  <a
                    key={browser.name}
                    href={browser.url}
                    className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700 bg-violet-50 hover:bg-violet-100 px-4 py-2 rounded-lg border border-violet-200 transition-colors"
                  >
                    {browser.name}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={320}>
            <div className="bg-bg-card rounded-2xl border border-violet-200 p-8 lg:p-10 mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Updates to This Policy</h2>
              <p className="text-slate-600 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices, legal requirements, or technology. We encourage you to review this page periodically for the latest information on our cookie practices. The date at the top of this page indicates when the policy was last revised.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={400}>
            <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <p className="text-sm text-slate-500">
                This Cookie Policy was last updated on {lastUpdated}.{' '}
                <Link to="/privacy" className="text-violet-600 hover:text-violet-700 font-medium transition-colors">
                  View our Privacy Policy
                </Link>{' '}
                for more information on how we handle your data.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
