import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import SEO from '../ui/SEO'
import { faqs, parkClinic, otherUnits } from '../../data/contact'
import { branches, primaryNumber } from '../../data/branches'
import { ContactFormSchema } from './schema'
import { useBranch } from '../../context/BranchContext'
import Reveal from '../ui/Reveal'
import BrandWave from '../ui/BrandWave'

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/SonoscanDiagnostic/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/sonoscan_healthcare/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/sonoscan-healthcare-pvt-ltd',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@sonoscanhealthcarewb',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

function BranchLocationBar() {
  const { selectedBranch, setSelectedBranch } = useBranch()

  return (
    <section className="bg-bg-surface border-b border-violet-200">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Selected Location</p>
              <p className="text-slate-900 font-semibold">{selectedBranch.name} — {selectedBranch.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <button
                onClick={() => {
                  const currentIdx = branches.findIndex(b => b.id === selectedBranch.id)
                  const nextIdx = (currentIdx + 1) % branches.length
                  setSelectedBranch(branches[nextIdx])
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                Switch Branch
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl shadow-black/10 border border-violet-200 py-2 w-56 opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {branches.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => setSelectedBranch(branch)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      selectedBranch.id === branch.id
                        ? 'bg-violet-100 text-violet-700 font-medium'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-medium">{branch.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{branch.address}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ContactPage() {
  const { selectedBranch } = useBranch()
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', message: '',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors(prev => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const result = ContactFormSchema.safeParse(formData)
    if (!result.success) {
      const errors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string
        if (!errors[field]) {
          errors[field] = issue.message
        }
      }
      setFormErrors(errors)
      return
    }

    setFormErrors({})
    setSubmitted(true)
  }

  return (
    <>
      <SEO
        title="Contact Us | Sonoscan Healthcare"
        description="Get in touch with Sonoscan Healthcare. Send us a message, find our contact information, or connect with us on social media."
      />

      {/* ═══ Hero ═══ */}
      <section className="rounded-b-4xl relative overflow-hidden min-h-screen bg-[#0a0715] -mt-16 lg:-mt-28">
        {/* Background image with slide-in animation */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="../images/contact.png"
            alt="Medical professionals"
            className="w-full h-full object-cover animate-slide-in-top"
            loading="eager"
          />
        </div>

        {/* Violet gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #5552e7, rgba(85,82,231,0.55) 45%, rgba(255,255,255,0))', zIndex: 3 }}
        />

        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #5552e7 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* Load overlay — fades out to reveal content */}
        <div className="absolute inset-0 z-40 pointer-events-none bg-[#0a0715] animate-overlay-fade" />

        <div className="container relative z-30 max-w-7xl mx-auto px-6 h-screen flex items-center pt-16 lg:pt-28">
          <div className="max-w-3xl text-left">
            {/* Breadcrumb */}
            <nav
              className="flex items-center justify-start gap-2 text-sm text-white/60 mb-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
              aria-label="Breadcrumb"
            >
              <Link
                to="/"
                className="text-white/60 hover:text-white transition-colors"
              >
                Home
              </Link>
              <svg className="w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
              <span className="text-white/80" aria-current="page">Contact Us</span>
            </nav>

            <div
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-medium mb-6 border border-white/20 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              Contact Us
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1100ms', animationFillMode: 'forwards' }}
            >
              Get In Touch{' '}
              <span className="text-violet-300">With Our Team</span>
            </h1>
            <p
              className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl mb-10 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1300ms', animationFillMode: 'forwards' }}
            >
              Have a question about our diagnostic services, want to book a test, or need to speak with a specialist? We are here to help. Reach out to us through any of the channels below.
            </p>

            {/* Social links — highlighted */}
            <div className="opacity-0 animate-fade-in-up flex flex-wrap items-center justify-start gap-3" style={{ animationDelay: '1500ms', animationFillMode: 'forwards' }}>
              <span className="text-sm font-semibold text-white/90 uppercase tracking-wider mr-1">Follow Us</span>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white text-violet-700 hover:bg-violet-600 hover:text-white border-2 border-white/40 shadow-lg shadow-black/20 flex items-center justify-center transition-all hover:scale-110 hover:shadow-violet-500/40"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <BrandWave variant="white" />
      </section>

      <BranchLocationBar />

      {/* ═══ Contact Cards ═══ */}
      <section className="pb-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>,
                title: 'Email Us', content: selectedBranch.email, subtext: 'We reply within 24 hours', action: 'Send Email', href: `mailto:${selectedBranch.email}`,
                bgColor: 'bg-violet-100', iconColor: 'text-violet-600', btnColor: 'text-violet-600', borderColor: 'border-violet-200',
              },
              {
                icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>,
                title: 'Call Us', content: selectedBranch.phone, subtext: `Monday - Saturday`, action: 'Call Now', href: `tel:${selectedBranch.phone}`,
                bgColor: 'bg-violet-100', iconColor: 'text-violet-600', btnColor: 'text-violet-600', borderColor: 'border-violet-200',
              },
              {
                icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>,
                title: 'Visit Us', content: selectedBranch.address, subtext: selectedBranch.hours, action: 'Get Directions', href: `https://www.google.com/maps?q=${encodeURIComponent(selectedBranch.address)}`,
                bgColor: 'bg-violet-100', iconColor: 'text-violet-600', btnColor: 'text-violet-600', borderColor: 'border-violet-200',
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
                title: 'Chat on WhatsApp', content: `+91 ${primaryNumber(selectedBranch.whatsapp)}`, subtext: 'Quick replies', action: 'Chat Now', href: `https://wa.me/91${primaryNumber(selectedBranch.whatsapp)}?text=${encodeURIComponent(`Hi! I am trying to get in touch with Sonoscan Healthcare (${selectedBranch.name}). Could you help me with my query or connect me with the right department?`)}`,
                bgColor: 'bg-emerald-100', iconColor: 'text-emerald-600', btnColor: 'text-emerald-600', borderColor: 'border-emerald-200',
              },
            ].map((card, i) => (
              <Reveal key={card.title} direction="up" delay={i * 100} threshold={0.1}>
                <div className={`bg-bg-card rounded-2xl p-8 shadow-xl border ${card.borderColor} text-center`}>
                  <div className={`w-14 h-14 mx-auto mb-5 ${card.bgColor} rounded-2xl flex items-center justify-center ${card.iconColor}`}>
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-slate-700 mb-1">{card.content}</p>
                  {card.subtext && <p className="text-slate-400 text-sm mb-5">{card.subtext}</p>}
                  <a
                    href={card.href}
                    target={card.title === 'Chat on WhatsApp' ? '_blank' : undefined}
                    rel={card.title === 'Chat on WhatsApp' ? 'noopener noreferrer' : undefined}
                    className={`inline-flex items-center gap-2 ${card.btnColor} font-semibold hover:gap-3 transition-all text-sm`}
                  >
                    {card.action}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WhatsApp CTA with QR Code ═══ */}
      <section className="py-16 bg-bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up" threshold={0.1}>
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-600 to-green-700 rounded-3xl shadow-2xl shadow-emerald-500/25">
              {/* Decorative circles */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-emerald-500/20 rounded-full blur-2xl" />
              <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-white/10 rounded-full" />
              <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-white/10 rounded-full" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 px-8 sm:px-12 lg:px-16 py-12 lg:py-14">
                {/* Left: Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-5 border border-white/20">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Instant Messaging
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                    Chat With Us On{' '}
                    <span className="text-emerald-200">WhatsApp</span>
                  </h2>
                  <p className="text-emerald-100/80 text-base lg:text-lg max-w-xl mb-6 leading-relaxed">
                    Skip the waiting room — send us a message on WhatsApp and our team will respond promptly with answers, appointment bookings, or test result inquiries.
                  </p>

                  {/* Benefits */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                    {[
                      { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>, text: 'Quick replies within minutes' },
                      { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>, text: 'Share reports & documents' },
                      { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>, text: 'Book appointments easily' },
                    ].map((benefit) => (
                      <div key={benefit.text} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-emerald-50 text-sm border border-white/10">
                        {benefit.icon}
                        {benefit.text}
                      </div>
                    ))}
                  </div>

                  <a
                    href={`https://wa.me/91${primaryNumber(selectedBranch.whatsapp)}?text=${encodeURIComponent(`Hi! I am trying to get in touch with Sonoscan Healthcare (${selectedBranch.name}). Could you help me with my query or connect me with the right department?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-xl hover:shadow-emerald-900/20 active:scale-[0.97] group"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Start Chat
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>

                {/* Right: QR Code */}
                <div className="shrink-0">
                  <div className="bg-white rounded-2xl p-5 shadow-xl shadow-emerald-900/20 text-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent('https://wa.me/91' + primaryNumber(selectedBranch.whatsapp))}`}
                      alt="Scan to chat on WhatsApp"
                      className="w-44 h-44 sm:w-48 sm:h-48 mx-auto rounded-xl"
                      loading="lazy"
                    />
                    <div className="mt-3 flex items-center justify-center gap-2 text-emerald-700 font-medium text-sm">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5l10.5 10.5M3.75 4.5v7.5m0-7.5h7.5m-7.5 15 2.25-2.25M9 19.5l2.25 2.25M15.75 15.75l4.5 4.5M18 12.75l2.25 2.25" />
                      </svg>
                      Scan to chat instantly
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ All Sonoscan Locations ═══ */}
      <section className="py-20 lg:py-28 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up" threshold={0.1}>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                Our Locations
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                All{' '}
                <span className="text-violet-600">Sonoscan</span> Centres
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                Visit any of our four conveniently located diagnostic centres across West Bengal. Each centre is equipped with state-of-the-art technology and staffed by experienced medical professionals.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {branches.map((branch, i) => (
              <Reveal key={branch.id} direction="up" delay={i * 100} threshold={0.1}>
                <div className="bg-bg-card rounded-2xl overflow-hidden border border-violet-200 shadow-lg hover:shadow-xl transition-shadow group">
                  {/* Map */}
                  <div className="h-52 lg:h-60 bg-slate-100 relative overflow-hidden">
                    <iframe
                      title={`${branch.name} location map`}
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${branch.lng - 0.03}%2C${branch.lat - 0.03}%2C${branch.lng + 0.03}%2C${branch.lat + 0.03}&layer=mapnik&marker=${branch.lat}%2C${branch.lng}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                      <h3 className="font-bold text-slate-900">{branch.name}</h3>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 lg:p-8">
                    <p className="text-slate-700 text-sm mb-5 flex items-start gap-2">
                      <svg className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      {branch.address}
                    </p>

                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm mb-6">
                      <a href={`tel:${branch.phone}`} className="flex items-center gap-2 text-slate-600 hover:text-violet-600 transition-colors">
                        <svg className="w-4 h-4 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        {branch.phone}
                      </a>
                      <div className="flex items-center gap-2 text-slate-600">
                        <svg className="w-4 h-4 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {branch.hours}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href={`mailto:${branch.email}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-100 text-violet-700 hover:bg-violet-200 text-sm font-medium transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        Email
                      </a>
                      <a
                        href={`https://wa.me/91${branch.whatsapp.split('/')[0].replace(/[^0-9]/g, '').trim()}?text=${encodeURIComponent('Hi! I am trying to get in touch with Sonoscan Healthcare ' + branch.name + '. Could you help me with my query?')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200 text-sm font-medium transition-all"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                      </a>
                      <a
                        href={`https://www.google.com/maps?q=${encodeURIComponent(branch.address + ', ' + branch.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm font-medium transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                        Directions
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Park Clinic Section ═══ */}
      <section className="py-20 lg:py-28 bg-bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up" threshold={0.1}>
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 rounded-3xl shadow-2xl shadow-violet-500/25">
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-violet-400/10 rounded-full blur-2xl" />

              <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-16 px-8 sm:px-12 lg:px-16 py-12 lg:py-14">
                {/* Left */}
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-5 border border-white/20">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    Technically Supported by Sonoscan
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                    {parkClinic.name}
                  </h2>
                  <p className="text-violet-200/80 text-base mb-2">{parkClinic.description}</p>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-start gap-3 text-white/90">
                      <svg className="w-5 h-5 text-violet-300 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      <span>{parkClinic.address}</span>
                    </div>
                    <div className="flex items-start gap-3 text-white/90">
                      <svg className="w-5 h-5 text-violet-300 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                      <span>{parkClinic.phone}</span>
                    </div>
                    <div className="flex items-start gap-3 text-white/90">
                      <svg className="w-5 h-5 text-violet-300 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                      <span>{parkClinic.email}</span>
                    </div>
                    {parkClinic.website && (
                      <div className="flex items-start gap-3 text-white/90">
                        <svg className="w-5 h-5 text-violet-300 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                        <span>{parkClinic.website}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={`tel:${parkClinic.phone.split('/')[0].replace(/[^0-9]/g, '').trim()}`}
                      className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-3 rounded-xl font-medium transition-all text-sm backdrop-blur-sm border border-white/10"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                      Call Park Clinic
                    </a>
                    {parkClinic.whatsapp && (
                      <a
                        href={`https://wa.me/91${parkClinic.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi! I would like to get in touch with Park Clinic.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-emerald-500/30 hover:bg-emerald-500/40 text-white px-5 py-3 rounded-xl font-medium transition-all text-sm backdrop-blur-sm border border-white/10"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                      </a>
                    )}
                    <a
                      href={`https://www.google.com/maps?q=${encodeURIComponent(parkClinic.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-3 rounded-xl font-medium transition-all text-sm backdrop-blur-sm border border-white/10"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                      Directions
                    </a>
                  </div>
                </div>

                {/* Right: Map */}
                {parkClinic.lat && parkClinic.lng && (
                  <div className="lg:w-96 shrink-0">
                    <div className="rounded-2xl overflow-hidden h-64 lg:h-full min-h-[240px] shadow-xl border border-white/10">
                      <iframe
                        title="Park Clinic location map"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${parkClinic.lng - 0.02}%2C${parkClinic.lat - 0.02}%2C${parkClinic.lng + 0.02}%2C${parkClinic.lat + 0.02}&layer=mapnik&marker=${parkClinic.lat}%2C${parkClinic.lng}`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Other Units ═══ */}
      <section className="py-20 lg:py-28 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up" threshold={0.1}>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
                Other Units
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Additional{' '}
                <span className="text-violet-600">Service Centres</span>
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                Sonoscan Healthcare also operates at the following locations across West Bengal, extending our reach to serve more communities.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherUnits.map((unit, i) => (
              <Reveal key={`${unit.name}-${i}`} direction="up" delay={i * 60} threshold={0.1}>
                <div className="bg-bg-card rounded-2xl p-6 border border-violet-200 hover:border-violet-300 hover:shadow-lg transition-all h-full flex flex-col group">
                  <div className="w-11 h-11 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{unit.name}</h3>
                  <p className="text-sm text-slate-600 mb-4 flex-1">{unit.address}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                    <a href={`tel:${unit.phone.replace(/[^0-9]/g, '')}`} className="text-slate-700 hover:text-violet-600 font-medium transition-colors">
                      {unit.phone}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Form & Info ═══ */}
      <section className="py-20 lg:py-28 bg-bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <Reveal direction="up">
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
                <p className="text-slate-500 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

                {submitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center animate-fade-in-up">
                    <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-emerald-700 mb-2">Message Sent Successfully!</h3>
                    <p className="text-emerald-600/70 mb-6">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                    <button
                      onClick={() => { setSubmitted(false); setFormErrors({}); setFormData({ name: '', email: '', phone: '', company: '', message: '' }) }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                        Your Name <span className="text-violet-600">*</span>
                      </label>
                      <input
                        id="name" type="text"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className={`w-full px-4 py-3.5 rounded-xl bg-bg-card border focus:ring-2 transition-all outline-none text-slate-900 placeholder-slate-400 ${
                          formErrors.name
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-violet-200 focus:border-violet-500 focus:ring-violet-500/20'
                        }`}
                        placeholder="John Doe"
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                          </svg>
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address <span className="text-violet-600">*</span>
                      </label>
                      <input
                        id="email" type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className={`w-full px-4 py-3.5 rounded-xl bg-bg-card border focus:ring-2 transition-all outline-none text-slate-900 placeholder-slate-400 ${
                          formErrors.email
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-violet-200 focus:border-violet-500 focus:ring-violet-500/20'
                        }`}
                        placeholder="john@example.com"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                          </svg>
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        id="phone" type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-bg-card border border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all outline-none text-slate-900 placeholder-slate-400"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                        Company <span className="text-violet-600">*</span>
                      </label>
                      <input
                        id="company" type="text"
                        value={formData.company}
                        onChange={(e) => updateField('company', e.target.value)}
                        className={`w-full px-4 py-3.5 rounded-xl bg-bg-card border focus:ring-2 transition-all outline-none text-slate-900 placeholder-slate-400 ${
                          formErrors.company
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-violet-200 focus:border-violet-500 focus:ring-violet-500/20'
                        }`}
                        placeholder="Your company name"
                      />
                      {formErrors.company && (
                        <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                          </svg>
                          {formErrors.company}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                        Your Message <span className="text-violet-600">*</span>
                      </label>
                      <textarea
                        id="message" rows={5}
                        value={formData.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        className={`w-full px-4 py-3.5 rounded-xl bg-bg-card border focus:ring-2 transition-all outline-none text-slate-900 placeholder-slate-400 resize-none ${
                          formErrors.message
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-violet-200 focus:border-violet-500 focus:ring-violet-500/20'
                        }`}
                        placeholder="Tell us how we can help you..."
                      />
                      {formErrors.message && (
                        <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                          </svg>
                          {formErrors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-2xl hover:shadow-violet-500/25 active:scale-[0.98] inline-flex items-center justify-center gap-2"
                    >
                      Submit Now
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                      </svg>
                    </button>
                  </form>
                )}
              </Reveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              <Reveal direction="up" delay={150} threshold={0.1}>
                {/* Branch Location */}
                <div className="bg-bg-card rounded-2xl p-8 border border-violet-200">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{selectedBranch.name} Branch</h3>
                      <p className="text-sm text-slate-400">{selectedBranch.address}</p>
                    </div>
                  </div>

                  {/* Map embed */}
                  <div className="rounded-xl overflow-hidden border border-violet-200 mb-5 h-48 lg:h-56 bg-slate-100">
                    <iframe
                      title={`${selectedBranch.name} location map`}
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedBranch.lng - 0.05}%2C${selectedBranch.lat - 0.05}%2C${selectedBranch.lng + 0.05}%2C${selectedBranch.lat + 0.05}&layer=mapnik&marker=${selectedBranch.lat}%2C${selectedBranch.lng}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                  <a
                    href={`https://www.google.com/maps?q=${encodeURIComponent(selectedBranch.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    Open in Google Maps
                  </a>

                  {/* Quick info */}
                  <div className="mt-5 pt-5 border-t border-violet-200 space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <svg className="w-4 h-4 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                      <a href={`tel:+91${primaryNumber(selectedBranch.phone)}`} className="text-slate-600 hover:text-violet-600 transition-colors">
                        {selectedBranch.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <svg className="w-4 h-4 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <span className="text-slate-600">{selectedBranch.hours}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <svg className="w-4 h-4 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                      <span className="text-slate-600">{selectedBranch.doctorCount} specialists</span>
                    </div>
                  </div>

                  <Link
                    to="/services/$id"
                    params={{ id: selectedBranch.id }}
                    className="mt-5 w-full block text-center bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-violet-500/25 active:scale-[0.98] text-sm"
                  >
                    View {selectedBranch.name} Branch Details
                  </Link>
                </div>

                {/* Quick FAQs */}
                <div className="bg-bg-card rounded-2xl p-8 border border-violet-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Quick FAQs</h3>
                  <div className="space-y-4">
                    {faqs.map((faq) => (
                      <details key={faq.q} className="group">
                        <summary className="flex items-center justify-between cursor-pointer text-slate-700 font-medium hover:text-violet-600 transition-colors">
                          <span className="text-sm">{faq.q}</span>
                          <svg className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                          </svg>
                        </summary>
                        <p className="text-sm text-slate-500 mt-3 leading-relaxed">{faq.a}</p>
                      </details>
                    ))}
                  </div>
                </div>

                {/* Social Connect */}
                <div className="bg-gradient-to-br from-violet-600 to-violet-700 rounded-2xl p-8 text-center text-white">
                  <h3 className="text-lg font-bold mb-2">Connect With Us</h3>
                  <p className="text-white/80 text-sm mb-6">Follow us on social media for the latest updates.</p>
                  <div className="flex items-center justify-center gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
