import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import SEO from '../ui/SEO'
import Reveal from '../ui/Reveal'
import BrandWave from '../ui/BrandWave'

/* ── Job openings data ── */
const jobOpenings = [
  {
    title: 'Pathology Specialist',
    department: 'Pathology',
    location: 'Kolkata / Malda',
    type: 'Full-time',
    requirements: ['MD in Pathology from a reputed institution', 'Minimum 2 years working experience in a reputed laboratory', 'Proficiency in English, Hindi & Bengali'],
  },
  {
    title: 'Radiology Specialist',
    department: 'Radiology & Imaging',
    location: 'Kolkata',
    type: 'Full-time',
    requirements: ['MD in Radio Diagnosis', '2+ years experience reporting routine USG, X-Ray, CT scans & guided procedures'],
  },
  {
    title: 'Lab Technician',
    department: 'Pathology',
    location: 'Kolkata / Malda / Balurghat',
    type: 'Full-time',
    requirements: ['DMLT / B.Sc. MLT qualification', 'Hands-on experience with automated analysers', 'Accuracy and attention to detail'],
  },
  {
    title: 'Radiology Technician',
    department: 'Radiology & Imaging',
    location: 'Kolkata',
    type: 'Full-time',
    requirements: ['Diploma in Medical Imaging Technology', 'Experience with MRI / CT / digital X-ray systems'],
  },
  {
    title: 'Administrative Executive',
    department: 'Administration',
    location: 'All Branches',
    type: 'Full-time',
    requirements: ['Graduate degree', 'Good computer literacy', 'Health sector working experience preferred'],
  },
  {
    title: 'Marketing Executive',
    department: 'Marketing',
    location: 'Kolkata',
    type: 'Full-time',
    requirements: ['Graduate degree in Marketing / Business', 'Experience in healthcare marketing', 'Strong communication skills'],
  },
]

/* ── Why Join Us benefits ── */
const joinBenefits = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
      </svg>
    ),
    title: 'State-of-the-Art Technology',
    description: 'Work with 3 Tesla Silent MRI, 128/384 Slice CT, and fully automated pathology analysers — exposure to the latest diagnostic equipment.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
      </svg>
    ),
    title: 'Learn While You Earn',
    description: 'Continuous on-the-job training and mentorship from senior specialists to grow your clinical and technical skills.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    title: 'Skill-Based Career Growth',
    description: 'A transparent growth path where your skills and performance determine your progression — not your seniority.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: 'Competitive Work Culture',
    description: 'A collaborative, patient-first environment with fair compensation and a culture that rewards excellence.',
  },
]

const APPLY_EMAIL = 'hr@sonoscanhealthcare.com'

export default function CareerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: '',
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
    const errors: Record<string, string> = {}
    if (formData.name.trim().length < 2) errors.name = 'Please enter your full name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Please enter a valid email'
    if (formData.phone.replace(/\D/g, '').length < 10) errors.phone = 'Please enter a valid phone number'
    if (!formData.position) errors.position = 'Please select a position'
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    setFormErrors({})
    setSubmitted(true)
  }

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-900 placeholder:text-slate-400 border transition-all focus:outline-none focus:ring-2 ${
      hasError
        ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-500/20'
        : 'border-slate-200 focus:border-violet-500 focus:ring-violet-500/20'
    }`

  return (
    <>
      <SEO
        title="Careers | Sonoscan Healthcare"
        description="Build your career at Sonoscan Healthcare — Eastern India's largest diagnostic service provider. Explore current job openings and apply today."
      />

      {/* ═══ Hero ═══ */}
      <section className="rounded-b-4xl relative overflow-hidden min-h-screen bg-[#0a0715] -mt-16 lg:-mt-28">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="../images/about.png"
            alt="Sonoscan Healthcare team"
            className="w-full h-full object-cover animate-slide-in-top"
            loading="eager"
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #5552e7, rgba(85,82,231,0.55) 45%, rgba(255,255,255,0))', zIndex: 3 }}
        />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #5552e7 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute inset-0 z-40 pointer-events-none bg-[#0a0715] animate-overlay-fade" />

        <div className="container relative z-30 max-w-7xl mx-auto px-6 h-screen flex items-center pt-16 lg:pt-28">
          <div className="max-w-2xl">
            <nav
              className="flex items-center gap-2 text-sm text-white/60 mb-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
              aria-label="Breadcrumb"
            >
              <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
              <svg className="w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
              <span className="text-white/80" aria-current="page">Careers</span>
            </nav>
            <div
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}
            >
              💼 Join Our Team
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1100ms', animationFillMode: 'forwards' }}
            >
              Grow Your Career With{' '}
              <span className="text-violet-300">Sonoscan</span>
            </h1>
            <p
              className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-xl mb-10 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1300ms', animationFillMode: 'forwards' }}
            >
              Be part of Eastern India's largest diagnostic service provider — where technology, mentorship, and patient care come together.
            </p>
            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '1500ms', animationFillMode: 'forwards' }}>
              <a
                href="#openings"
                className="group relative inline-flex items-center justify-center bg-[#27272e] text-white pt-[17.5px] pb-[19.5px] px-[30px] rounded-[5px] font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/30 active:scale-[0.97]"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-black">View Openings</span>
                <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <BrandWave variant="white" />
      </section>

      {/* ═══ Why Join Us ═══ */}
      <section className="py-20 lg:py-28 bg-bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200">
                Why Join Us
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                A Workplace Built Around{' '}
                <span className="text-violet-600">Growth</span>
              </h2>
              <p className="text-lg text-slate-500">
                We invest in our people because they are the heart of Sonoscan. Here is what makes working with us different.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {joinBenefits.map((benefit, i) => (
              <Reveal key={benefit.title} direction="up" delay={i * 100} threshold={0.1}>
                <div className="group bg-bg-card rounded-2xl border border-violet-200 p-7 h-full hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600 mb-5 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-violet-700 group-hover:text-white transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-violet-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{benefit.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Openings ═══ */}
      <section id="openings" className="py-20 lg:py-28 bg-bg-base scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200">
                Current Openings
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Job Openings At{' '}
                <span className="text-violet-600">Sonoscan</span>
              </h2>
              <p className="text-lg text-slate-500">
                {jobOpenings.length} positions currently open. If you share our passion for quality healthcare, we would love to hear from you.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobOpenings.map((job, i) => (
              <Reveal key={job.title} direction="up" delay={i * 80} threshold={0.1}>
                <div className="group bg-bg-card rounded-2xl border border-violet-200 p-7 h-full flex flex-col hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
                      {job.title}
                    </h3>
                    <span className="shrink-0 text-xs font-semibold text-violet-700 bg-violet-50 border border-violet-200 px-2.5 py-1 rounded-full">
                      {job.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-violet-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      {job.department}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-violet-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      {job.location}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {job.requirements.map(req => (
                      <li key={req} className="flex items-start gap-2 text-sm text-slate-600">
                        <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        {req}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#apply"
                    onClick={() => updateField('position', job.title)}
                    className="block w-full text-center bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:shadow-violet-500/25 active:scale-[0.98]"
                  >
                    Apply For This Position
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Application Form ═══ */}
      <section id="apply" className="py-20 lg:py-28 bg-bg-surface scroll-mt-28">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200">
                Apply Now
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Submit Your{' '}
                <span className="text-violet-600">Application</span>
              </h2>
              <p className="text-lg text-slate-500">
                Fill in the form below and our HR team will get back to you. You can also email your CV to{' '}
                <a href={`mailto:${APPLY_EMAIL}`} className="text-violet-600 font-medium hover:underline">{APPLY_EMAIL}</a>.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={150}>
            <div className="bg-bg-card rounded-3xl border border-violet-200 shadow-xl shadow-violet-500/5 p-8 lg:p-12">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Application Submitted!</h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    Thank you for your interest in joining Sonoscan Healthcare. Our HR team will review your application and contact you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: '', email: '', phone: '', position: '', message: '' })
                    }}
                    className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-medium transition-all"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={e => updateField('name', e.target.value)}
                      placeholder="Your full name"
                      className={inputClass(!!formErrors.name)}
                    />
                    {formErrors.name && <p className="text-xs text-rose-500 mt-1.5">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={e => updateField('email', e.target.value)}
                      placeholder="you@example.com"
                      className={inputClass(!!formErrors.email)}
                    />
                    {formErrors.email && <p className="text-xs text-rose-500 mt-1.5">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">Phone *</label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={e => updateField('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className={inputClass(!!formErrors.phone)}
                    />
                    {formErrors.phone && <p className="text-xs text-rose-500 mt-1.5">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="position" className="block text-sm font-semibold text-slate-700 mb-2">Position *</label>
                    <select
                      id="position"
                      value={formData.position}
                      onChange={e => updateField('position', e.target.value)}
                      className={inputClass(!!formErrors.position)}
                    >
                      <option value="">Select a position</option>
                      {jobOpenings.map(job => (
                        <option key={job.title} value={job.title}>{job.title}</option>
                      ))}
                    </select>
                    {formErrors.position && <p className="text-xs text-rose-500 mt-1.5">{formErrors.position}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                      Cover Message <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={e => updateField('message', e.target.value)}
                      placeholder="Tell us a little about yourself and why you'd like to join Sonoscan..."
                      className={`${inputClass(false)} resize-none`}
                    />
                  </div>
                  <div className="md:col-span-2 flex flex-col sm:flex-row items-center gap-4 pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-2xl hover:shadow-violet-500/25 active:scale-[0.98]"
                    >
                      Submit Application
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                    <p className="text-xs text-slate-400 text-center sm:text-left">
                      We respect your privacy. Your details are used only for recruitment purposes.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
