import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import SEO from '../ui/SEO'
import { servicesData, planFeatures, pricingPlans } from '../../data/services'
import { stats } from '../../data/home'
import { departments } from '../../data/departments'
import { useBranch } from '../../context/BranchContext'
import Reveal from '../ui/Reveal'
import CountUp from '../ui/CountUp'
import { hoverIcons } from '../ui/ServiceIcons'
import DoctorSection from '../ui/DoctorSection'
import DepartmentCard from '../ui/DepartmentCard'
import BrandWave from '../ui/BrandWave'

export default function ServicesPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const { selectedBranch } = useBranch()

  return (
    <>
      <SEO
        title="Our Services | Sonoscan Healthcare"
        description="Explore comprehensive healthcare services at Sonoscan Healthcare — from primary care and mental health to dental, eye care, dermatology, and specialty treatments."
      />

      {/* ═══ Hero Section ═══ */}
      <section className="rounded-b-4xl relative overflow-hidden min-h-screen bg-[#0a0715] -mt-16 lg:-mt-28">
        {/* Background image with slide-in animation */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="../images/kolkata.png"
            alt="Medical professional"
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

        {/* Text content */}
        <div className="container relative z-30.. max-w-7xl mx-auto px-6 h-screen flex items-center pt-16 lg:pt-28">
          <div className="max-w-2xl">
            {/* Breadcrumb */}
            <nav
              className="flex flex-wrap items-center gap-2 text-sm text-white/60 mb-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
              aria-label="Breadcrumb"
            >
              <Link to="/" className="text-white/60 hover:text-white transition-colors shrink-0">Home</Link>
              <svg className="w-3.5 h-3.5 text-white/30 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
              <span className="text-white/80 min-w-0 truncate" aria-current="page">Services</span>
            </nav>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}
            >
              Our Services
            </div>
            {/* Heading */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1100ms', animationFillMode: 'forwards' }}
            >
              Our{' '}
              <span className="text-violet-300">Services</span>
            </h1>
            {/* Description */}
            <p
              className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-xl mb-10 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1300ms', animationFillMode: 'forwards' }}
            >
              From preventive care to specialized treatments, we offer a full spectrum of medical services designed for every stage of life.
            </p>
            {/* CTA Button */}
            <Reveal direction="scale" delay={1500} threshold={0.01}>
              <Link
                to="/appointments"
                className="group relative inline-flex items-center justify-center bg-[#27272e] text-white pt-[17.5px] pb-[19.5px] px-[30px] rounded-[5px] font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/30 active:scale-[0.97]"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
                  Book An Appointment
                </span>
                <span
                  className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>
        </div>

        <BrandWave variant="white" />
      </section>

      {/* ═══ Expertise Section ═══ */}
      <Reveal direction="up">
        <section className="py-20 lg:py-28 bg-bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-[1.2] mb-6">
                  The Best Essence Of Our{' '}
                  <span className="text-violet-600">Medical Expertise</span>
                </h2>
                <p className="text-slate-500 leading-relaxed mb-10">
                  Our multidisciplinary team of specialists works collaboratively to provide comprehensive, coordinated care for all your health needs.
                </p>

                <div className="space-y-8">
                  {[
                    {
                      title: 'Access Expert Advice For A Thriving Life',
                      description: 'Our physicians provide evidence-based medical advice to help you thrive at every stage of life.',
                    },
                    {
                      title: 'Benefits Of Health Conscious Living',
                      description: 'Discover how mindful health choices can prevent disease and improve your overall quality of life.',
                    },
                    {
                      title: 'Benefits Of Proactive Health Management',
                      description: 'Take control of your health with proactive management programs designed to prevent illness and promote wellness.',
                    },
                  ].map((item, i) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-4 animate-fade-in-up"
                      style={{ animationDelay: `${(i + 1) * 100}ms` }}
                    >
                      <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 shrink-0 mt-1">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                        <p className="text-slate-500 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right visual — heartbeat-pulse badge: concentric rings
                  radiate from the shield (like an ECG pulse) while the badge
                  floats gently and the icon breathes */}
              <Reveal direction="right" delay={150}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-violet-500/10 rounded-full blur-3xl animate-pulse-soft pointer-events-none" aria-hidden="true" />
                  <div className="bg-bg-card rounded-2xl border border-violet-200 shadow-xl shadow-violet-500/5 p-8 lg:p-10">
                    <div className="relative aspect-square bg-gradient-to-br from-violet-50 via-bg-elevated to-violet-50 rounded-2xl flex items-center justify-center overflow-hidden">
                      {/* Heartbeat pulse rings — inset-0 + auto margins center
                          them on the shield badge; pointer-events-none keeps
                          them purely decorative */}
                      <span className="absolute inset-0 m-auto w-36 h-36 rounded-full border-2 border-violet-400/50 animate-heartbeat-ring pointer-events-none" aria-hidden="true" />
                      <span className="absolute inset-0 m-auto w-36 h-36 rounded-full border-2 border-violet-400/35 animate-heartbeat-ring pointer-events-none" style={{ animationDelay: '0.8s' }} aria-hidden="true" />
                      <span className="absolute inset-0 m-auto w-36 h-36 rounded-full border-2 border-violet-400/20 animate-heartbeat-ring pointer-events-none" style={{ animationDelay: '1.6s' }} aria-hidden="true" />

                      <div className="text-center">
                        <div className="relative w-32 h-32 mx-auto mb-6">
                          <div className="w-32 h-32 bg-violet-100 rounded-full flex items-center justify-center animate-float animate-glow">
                            <svg className="w-16 h-16 text-violet-600 animate-scale-pulse" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-slate-700 font-medium">Medical Excellence</p>
                        <p className="text-slate-400 text-sm mt-1">Committed to your well-being</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ═══ Service Cards Grid ═══ */}
      <section id="our-services" className="py-20 lg:py-28 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200">
                Our Services
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Discover Our Range Of Specialized Services For Optimal Health
              </h2>
              <p className="text-lg text-slate-500">
                Explore our full range of medical services, each designed with your health and comfort in mind.
              </p>
            </div>
          </Reveal>

          {/* ── Flush 2-column grid for 4 services ── */}
          <div className="border border-violet-200 rounded-xl overflow-hidden">
            {[servicesData.slice(0, 2), servicesData.slice(2, 4)].map((row, rowIdx) => (
              <div
                key={rowIdx}
                className={`grid grid-cols-1 sm:grid-cols-2 ${rowIdx < 1 ? 'border-b border-violet-200' : ''}`}
              >
              {row.map((service, colIdx) => (
                <Reveal key={service.id} direction="up" delay={(rowIdx * 2 + colIdx) * 120} threshold={0.01}>
                  <div
                    className={`group relative p-8 lg:p-10 transition-colors duration-500 hover:bg-violet-50/50 ${colIdx < 1 ? 'sm:border-r border-violet-200' : ''}`}
                  >
                    <Link
                      to="/services/$id"
                      params={{ id: service.id }}
                      className="block"
                    >
                      <div className="relative w-14 h-14 mb-5">
                        {/* Default emoji icon */}
                        <span className="absolute inset-0 flex items-center justify-center text-3xl transition-all duration-500 group-hover:opacity-0 group-hover:scale-75">
                          {service.icon}
                        </span>
                        {/* Hover SVG icon */}
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                          {hoverIcons[service.id] ?? service.icon}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-violet-600 transition-colors duration-300">
                        {service.title}
                      </h3>

                      <p className="text-slate-500 leading-relaxed mb-6 text-sm">
                        {service.tagline}
                      </p>

                      {/* ── Read More ── */}
                      <span className="group/link inline-flex items-center gap-2 text-violet-600 font-medium">
                        <span className="overflow-hidden h-5 inline-block align-middle">
                          <span className="flex flex-col transition-transform duration-300 group-hover/link:-translate-y-1/2">
                            <span className="h-5 leading-5">Read More</span>
                            <span className="h-5 leading-5">Read More</span>
                          </span>
                        </span>
                        <svg
                          className="w-4 h-4 transition-all duration-300 group-hover/link:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </span>
                    </Link>
                </div>
              </Reveal>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Departments Grid ═══ */}
      <section className="py-20 lg:py-28 bg-bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200">
                Our Departments
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Explore Our Medical Departments
              </h2>
              <p className="text-lg text-slate-500">
                Click on any department to learn more about our services and doctors.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {departments
              .filter(d => d.branchIds.includes(selectedBranch.id))
              .map((dept, i) => (
                <Reveal key={dept.id} direction="up" delay={(i % 4) * 80} threshold={0.01}>
                  <DepartmentCard dept={dept} index={i} />
                </Reveal>
              ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/departments"
              className="group/link inline-flex items-center gap-2 text-violet-600 font-medium hover:text-violet-700 transition-colors"
            >
              <span className="overflow-hidden h-5 inline-block align-middle">
                <span className="flex flex-col transition-transform duration-300 group-hover/link:-translate-y-1/2">
                  <span className="h-5 leading-5">View All Departments</span>
                  <span className="h-5 leading-5">View All Departments</span>
                </span>
              </span>
              <svg className="w-4 h-4 transition-all duration-300 group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Outdoor Doctor CTA ═══ */}
      <section className="py-16 lg:py-20 bg-bg-surface border-y border-violet-200">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up">
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 rounded-3xl shadow-2xl shadow-violet-500/25">
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-violet-400/10 rounded-full blur-2xl" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 px-8 sm:px-12 lg:px-16 py-12 lg:py-14">
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-5 border border-white/20">
                    🩺 Outdoor Doctor
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                    Specialist OPD Consultations Near You
                  </h2>
                  <p className="text-violet-200/80 mb-6 max-w-xl mx-auto lg:mx-0">
                    Book a consultation with our panel of specialists — cardiology, neurology, gastroenterology, ENT, and more — across all Sonoscan branches.
                  </p>
                  <Link
                    to="/outdoor-doctor"
                    className="inline-flex items-center gap-3 bg-white text-violet-700 hover:bg-violet-50 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-xl active:scale-[0.97] group"
                  >
                    View Outdoor Doctor Schedule
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
                <div className="shrink-0 hidden sm:block">
                  <div className="w-44 h-44 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-7xl animate-float">
                    🩺
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <DoctorSection />

      {/* ═══ Appointments CTA Strip ═══ */}
      <section className="py-16 lg:py-20 bg-bg-surface border-y border-violet-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Reveal direction="up" delay={0} threshold={0.01}>
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200">
              Open For Appointments
            </div>
          </Reveal>
          <Reveal direction="up" delay={120} threshold={0.01}>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              We Will Serve You With Our Healthcare Services
            </h2>
          </Reveal>
          <Reveal direction="up" delay={240} threshold={0.01}>
            <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto">
              Our team is ready to provide you with exceptional care. Schedule your visit today.
            </p>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-4">
            <Reveal direction="scale" delay={360} threshold={0.01}>
              <Link
                to="/appointments"
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-2xl hover:shadow-violet-500/25 active:scale-95"
              >
                Book An Appointment
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </Reveal>
            <Reveal direction="scale" delay={480} threshold={0.01}>
              <Link
                to="/services"
                hash="our-services"
                className="inline-flex items-center gap-2 border-2 border-violet-300 hover:border-violet-400 text-slate-600 hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all"
              >
                View All Services
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ Stats Section ═══ */}
      <Reveal direction="up">
        <section className="relative overflow-hidden bg-gradient-to-r from-violet-100 via-violet-50 to-bg-base border-y border-violet-200 py-12">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #5552e7 1px, transparent 0)', backgroundSize: '30px 30px' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} direction="up" delay={i * 200} threshold={0.01}>
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-1"><CountUp value={stat.value} /></div>
                    <div className="text-violet-600/80 text-sm lg:text-base">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ═══ Pricing Plans Section ═══ */}
      <section className="py-20 lg:py-28 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Flexible Pricing Plan For Your Medical Health Services
              </h2>
              <p className="text-slate-500 mb-8">
                It's important to note that medical practice is governed by ethical principles, including patient confidentiality, informed consent, and the duty to provide.
              </p>

              {/* Monthly / Yearly Toggle */}
              <div className="inline-flex items-center gap-3 bg-bg-card rounded-xl p-1.5 border border-violet-200">
                <button
                  onClick={() => setBilling('monthly')}
                  className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    billing === 'monthly'
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBilling('yearly')}
                  className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    billing === 'yearly'
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <Reveal key={plan.name} direction="up" delay={i * 200} threshold={0.01}>
                <div
                  className={`relative bg-bg-card rounded-2xl border p-8 lg:p-10 transition-all duration-300 ${
                    plan.popular
                      ? 'border-violet-400 shadow-2xl shadow-violet-500/10 scale-105 lg:scale-110'
                      : 'border-violet-200 hover:border-violet-300'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-extrabold text-slate-900 animate-suffix-pulse" style={{ animationDelay: `${i * 200 + 800}ms` }}>
                      {billing === 'monthly' ? plan.monthly : plan.yearly}
                    </span>
                    <span className="text-slate-400 text-sm">/month</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-6">{plan.description}</p>

                  <Link
                    to="/appointments"
                    className={`block w-full text-center px-6 py-3 rounded-lg font-semibold text-sm transition-all mb-6 ${
                      plan.popular
                        ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/25'
                        : 'bg-bg-elevated hover:bg-violet-600 text-slate-700 hover:text-white border border-violet-200'
                    }`}
                  >
                    Select Plan
                  </Link>

                  <ul className="space-y-3">
                    {planFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                        <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="py-20 lg:py-28 bg-bg-surface relative overflow-hidden border-t border-violet-200">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #5552e7 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Reveal direction="up" delay={0} threshold={0.01}>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Explore Our Comprehensive Healthcare Solutions
            </h2>
          </Reveal>
          <Reveal direction="up" delay={120} threshold={0.01}>
            <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto">
              Experience the difference that comprehensive, compassionate healthcare makes. Book your appointment today.
            </p>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-4">
            <Reveal direction="scale" delay={240} threshold={0.01}>
              <Link
                to="/appointments"
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-2xl hover:shadow-violet-500/25 active:scale-95"
              >
                Book An Appointment
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </Reveal>
            <Reveal direction="scale" delay={360} threshold={0.01}>
              <Link
                to="/services"
                hash="our-services"
                className="inline-flex items-center gap-2 border-2 border-violet-300 hover:border-violet-400 text-slate-600 hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all"
              >
                Our Specialities
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>

        <BrandWave />
      </section>
    </>
  )
}
