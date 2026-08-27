import { Link, useParams } from '@tanstack/react-router'
import SEO from '../ui/SEO'
import { servicesData } from '../../data/services'
import { outdoorDoctorGroups } from '../../data/outdoorDoctors'
import { hoverIcons } from '../ui/ServiceIcons'
import BrandWave from '../ui/BrandWave'
import { primaryNumber } from '../../data/branches'
import { useBranch } from '../../context/BranchContext'
import OPDConsultantsSection from '../ui/OPDConsultantsSection'

export { servicesData }

export default function ServiceDetailPage() {
  const { id } = useParams({ from: '/services/$id' })
  const { selectedBranch } = useBranch()
  const service = servicesData.find(s => s.id === id)

  if (!service) {
    return (
      <>
        <SEO title="Service Not Found | Sonoscan Healthcare" description="The requested service could not be found at Sonoscan Healthcare." />
        <section className="min-h-screen bg-bg-base flex items-center justify-center px-6">
          <div className="text-center animate-fade-in-up">
            <div className="text-6xl mb-6">🔍</div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Service Not Found</h1>
            <p className="text-slate-500 mb-8">The service you're looking for doesn't exist.</p>
            <Link
              to="/services"
              className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Back to Services
            </Link>
          </div>
        </section>
      </>
    )
  }

  const currentIndex = servicesData.findIndex(s => s.id === id)
  const prevService = currentIndex > 0 ? servicesData[currentIndex - 1] : null
  const nextService = currentIndex < servicesData.length - 1 ? servicesData[currentIndex + 1] : null

  const heroImageMap: Record<string, string> = {
    'primary-care': 'https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?w=1920&q=80',
    'mental-health': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920&q=80',
    'dental-care': 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1920&q=80',
    'eye-care': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80',
  }

  return (
    <>
      <SEO
        title={`${service.title} | Sonoscan Healthcare`}
        description={`Learn about our ${service.title} services at Sonoscan Healthcare. ${service.tagline}. Book an appointment today.`}
      />

      {/* ═══ Hero Section ═══ */}
      <section className="rounded-b-4xl relative overflow-hidden min-h-screen bg-[#0a0715] -mt-16 lg:-mt-28">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImageMap[service.id]}
            alt={service.title}
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
          <div className="flex flex-wrap items-center gap-8 lg:gap-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
            {/* Service Icon */}
            <div className="shrink-0">
              <div className="group relative w-28 h-28 lg:w-36 lg:h-36 overflow-hidden rounded-full bg-violet-100 ring-4 ring-white/20 shadow-2xl shadow-violet-500/50 transition-all duration-500 flex items-center justify-center">
                <span className="text-5xl lg:text-6xl transition-all duration-500 group-hover:scale-110 group-hover:opacity-50">
                  {service.icon}
                </span>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 text-violet-600 drop-shadow-lg group-hover:animate-hover-pulse">
                    {hoverIcons[service.id] ?? service.icon}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              {/* Breadcrumb */}
              <nav
                className="flex items-center gap-2 text-sm text-white/60 mb-4"
                aria-label="Breadcrumb"
              >
                <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
                <svg className="w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                <Link to="/services" className="text-white/60 hover:text-white transition-colors">Services</Link>
                <svg className="w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                <span className="text-white/80" aria-current="page">{service.title}</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium mb-4 border border-white/20">
                Medical Service
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-2">
                {service.title}
              </h1>
              <p className="text-lg text-white/80 max-w-xl">{service.tagline}</p>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-4 mt-5">
                <div className="flex items-center gap-1.5 text-sm text-white/70">
                  <svg className="w-4 h-4 text-violet-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {service.details?.length || 0} services
                </div>
                <div className="flex items-center gap-1.5 text-sm text-white/70">
                  <svg className="w-4 h-4 text-violet-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  {service.pricing.length} plan options
                </div>
                <div className="flex items-center gap-1.5 text-sm text-white/70">
                  <svg className="w-4 h-4 text-violet-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                  {service.doctors.length} specialists
                </div>
              </div>
            </div>
          </div>
        </div>

        <BrandWave variant="white" />
      </section>

      {/* ═══ OPD Doctors ═══ */}
      <OPDConsultantsSection
        groups={outdoorDoctorGroups[selectedBranch.id] ?? []}
        branchName={selectedBranch.name}
        previewCount={3}
      />

      {/* ═══ Main Content ═══ */}
      <section className="py-16 lg:py-24 bg-bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Left column — Description & Details */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Service</h2>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </div>

              {/* What We Offer */}
              <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <h2 className="text-2xl font-bold text-slate-900 mb-5">What We Offer</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.details?.map((detail) => (
                    <div key={detail} className="flex items-start gap-3 bg-bg-card rounded-xl p-4 border border-violet-200 hover:border-violet-300 transition-all">
                      <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-600">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Benefits */}
              <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <h2 className="text-2xl font-bold text-slate-900 mb-5">Why Choose Our {service.title}?</h2>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Expert-Led Care',
                      description: `Our ${service.title.toLowerCase()} team consists of board-certified specialists with years of advanced training and clinical experience.`,
                    },
                    {
                      title: 'Personalized Treatment Plans',
                      description: 'Every patient receives a customized care plan tailored to their unique needs, health goals, and lifestyle preferences.',
                    },
                    {
                      title: 'Advanced Technology',
                      description: 'We utilize the latest medical technology and evidence-based practices to ensure the highest standard of care and optimal outcomes.',
                    },
                    {
                      title: 'Compassionate Approach',
                      description: 'We believe in treating the whole person, not just the symptoms. Our team provides care with empathy, respect, and clear communication.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{item.title}</p>
                        <p className="text-sm text-slate-500 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              {/* Pricing */}
              <div className="bg-bg-card rounded-2xl p-6 border border-violet-200">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Pricing Plans</h3>
                <div className="space-y-3">
                  {service.pricing.map((p) => (
                    <div key={p.plan} className="flex items-center justify-between bg-bg-elevated rounded-lg px-4 py-3 border border-violet-200">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{p.plan}</p>
                        <p className="text-xs text-slate-400">{p.note}</p>
                      </div>
                      <span className="text-lg font-bold text-violet-600">{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Our Specialists */}
              <div className="bg-bg-card rounded-2xl p-6 border border-violet-200">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Our Specialists</h3>
                <div className="space-y-3">
                  {service.doctors.map((doc) => (
                    <div key={doc} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {doc.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{doc}</p>
                        <p className="text-xs text-slate-400">Specialist</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-bg-card rounded-2xl p-6 border border-violet-200">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Quick Info</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-violet-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Mon–Sat: 8:00 AM – 7:00 PM
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-violet-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25Z" />
                    </svg>
                    9775996262
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-violet-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    44, S.M. Avenue, Kolkata - 700014
                  </li>
                </ul>
              </div>

              {/* Book Button */}
              <Link
                to="/appointments"
                className="block w-full text-center bg-violet-600 hover:bg-violet-700 text-white px-6 py-4 rounded-xl font-semibold transition-all hover:shadow-2xl hover:shadow-violet-500/25 active:scale-[0.98]"
              >
                Book {service.title} Appointment
              </Link>
            </div>
          </div>
        </div>

          {/* ═══ WhatsApp CTA with QR Code ═══ */}
          <div className="mt-16 animate-fade-in-up">
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
                    Have Questions?
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                    Ask About{' '}
                    <span className="text-emerald-200">{service.title}</span>
                  </h2>
                  <p className="text-emerald-100/80 text-base lg:text-lg max-w-xl mb-6 leading-relaxed">
                    Not sure which test or package is right for you? Send us a message on WhatsApp and our team will guide you through the options, pricing, and appointment process.
                  </p>

                  {/* Benefits */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                    {[
                      { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>, text: 'Get instant answers' },
                      { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>, text: 'Know pricing & packages' },
                      { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>, text: 'Book your appointment' },
                    ].map((benefit) => (
                      <div key={benefit.text} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-emerald-50 text-sm border border-white/10">
                        {benefit.icon}
                        {benefit.text}
                      </div>
                    ))}
                  </div>

                  <a
                    href={`https://wa.me/91${primaryNumber(selectedBranch.whatsapp)}?text=${encodeURIComponent(`Hi! I am interested in ${service.title} at Sonoscan Healthcare (${selectedBranch.name}). Could you please share more details about the tests, pricing, and how I can book an appointment?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-xl hover:shadow-emerald-900/20 active:scale-[0.97] group"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Ask About {service.title}
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
                      alt="Scan to ask about this service on WhatsApp"
                      className="w-44 h-44 sm:w-48 sm:h-48 mx-auto rounded-xl"
                      loading="lazy"
                    />
                    <div className="mt-3 flex items-center justify-center gap-2 text-emerald-700 font-medium text-sm">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5l10.5 10.5M3.75 4.5v7.5m0-7.5h7.5m-7.5 15 2.25-2.25M9 19.5l2.25 2.25M15.75 15.75l4.5 4.5M18 12.75l2.25 2.25" />
                      </svg>
                      Scan to inquire
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation between services */}
          <div className="flex justify-between mt-16 pt-8 border-t border-violet-200 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            {prevService ? (
              <Link
                to="/services/$id"
                params={{ id: prevService.id }}
                className="flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors group"
              >
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                <span className="hidden sm:inline">{prevService.title}</span>
              </Link>
            ) : <div />}
            {nextService && (
              <Link
                to="/services/$id"
                params={{ id: nextService.id }}
                className="flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors group"
              >
                <span className="hidden sm:inline">{nextService.title}</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            )}
          </div>
      </section>
    </>
  )
}
