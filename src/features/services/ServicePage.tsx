import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import SEO from '../ui/SEO'
import { servicesData, planFeatures, pricingPlans } from '../../data/services'
import { stats } from '../../data/home'
import { departments } from '../../data/departments'
import { outdoorDoctorGroups } from '../../data/outdoorDoctors'
import { useBranch } from '../../context/BranchContext'
import Reveal from '../ui/Reveal'
import CountUp from '../ui/CountUp'
import { hoverIcons } from '../ui/ServiceIcons'
import DoctorSection from '../ui/DoctorSection'
import DepartmentCard from '../ui/DepartmentCard'
import OPDConsultantsSection from '../ui/OPDConsultantsSection'
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
      <section className="relative overflow-hidden min-h-screen bg-[#0a0715] -mt-16 lg:-mt-28">
        {/* Background image with cinematic zoom */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="../images/kolkata.png"
            alt="Medical professional"
            className="w-full h-full object-cover animate-hero-zoom-slow"
            loading="eager"
          />
        </div>

        {/* Multi-layer gradient overlays for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(85,82,231,0.85) 0%, rgba(85,82,231,0.5) 40%, rgba(88,28,135,0.3) 60%, transparent 100%)',
            zIndex: 2,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(10,7,21,0.95) 0%, rgba(10,7,21,0.4) 40%, transparent 70%)',
            zIndex: 2,
          }}
        />

        {/* Animated floating orbs */}
        <div className="absolute top-20 right-[15%] w-72 h-72 bg-violet-500/20 rounded-full blur-[100px] animate-float pointer-events-none" style={{ zIndex: 2 }} />
        <div className="absolute bottom-40 left-[10%] w-56 h-56 bg-purple-500/15 rounded-full blur-[80px] animate-float-slow pointer-events-none" style={{ zIndex: 2 }} />

        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #5552e7 1px, transparent 0)', backgroundSize: '40px 40px', zIndex: 2 }} />

        {/* Load overlay */}
        <div className="absolute inset-0 z-40 pointer-events-none bg-[#0a0715] animate-overlay-fade" />

        {/* Content */}
        <div className="container relative z-30 max-w-7xl mx-auto px-6 h-screen flex items-center pt-16 lg:pt-28">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav
              className="flex flex-wrap items-center gap-2 text-sm text-white/50 mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
              aria-label="Breadcrumb"
            >
              <Link to="/" className="text-white/50 hover:text-white transition-colors shrink-0">Home</Link>
              <svg className="w-3.5 h-3.5 text-white/25 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
              <span className="text-white/80 min-w-0 truncate" aria-current="page">Services</span>
            </nav>

            {/* Glass badge */}
            <div
              className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-white/15 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-subtle" />
              Trusted by 50,000+ patients
            </div>

            {/* Heading */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.1] mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1100ms', animationFillMode: 'forwards' }}
            >
              World-Class{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                  Healthcare
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-400 to-purple-400 rounded-full opacity-60" />
              </span>
              <br />
              Under One Roof
            </h1>

            {/* Description */}
            <p
              className="text-lg lg:text-xl text-slate-300/80 leading-relaxed max-w-xl mb-10 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1300ms', animationFillMode: 'forwards' }}
            >
              From preventive care to specialized treatments, we offer a full spectrum of medical services designed for every stage of life.
            </p>

            {/* CTA Buttons */}
            <Reveal direction="scale" delay={1500} threshold={0.01}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/appointments"
                  className="group relative inline-flex items-center justify-center gap-2.5 bg-white text-[#0a0715] px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 active:scale-[0.97]"
                >
                  <span className="relative z-10">Book An Appointment</span>
                  <svg className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                  <span className="absolute inset-0 bg-gradient-to-r from-violet-100 to-purple-100 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" aria-hidden="true" />
                </Link>
                <a
                  href="#our-services"
                  className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:border-white/40 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-white/5"
                >
                  Explore Services
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <BrandWave variant="white" />
      </section>

      {/* ═══ Expertise Section ═══ */}
      <Reveal direction="up">
        <section className="py-20 lg:py-28 bg-bg-surface relative overflow-hidden">
          {/* Decorative background shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-100/50 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100/40 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-violet-100/80 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-violet-200/60">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                  Why Choose Us
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-[1.2] mb-6">
                  The Best Essence Of Our{' '}
                  <span className="text-violet-600">Medical Expertise</span>
                </h2>
                <p className="text-slate-500 leading-relaxed mb-10 text-lg">
                  Our multidisciplinary team of specialists works collaboratively to provide comprehensive, coordinated care for all your health needs.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      title: 'Access Expert Advice For A Thriving Life',
                      description: 'Our physicians provide evidence-based medical advice to help you thrive at every stage of life.',
                      icon: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                      ),
                    },
                    {
                      title: 'Benefits Of Health Conscious Living',
                      description: 'Discover how mindful health choices can prevent disease and improve your overall quality of life.',
                      icon: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                      ),
                    },
                    {
                      title: 'Benefits Of Proactive Health Management',
                      description: 'Take control of your health with proactive management programs designed to prevent illness and promote wellness.',
                      icon: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                      ),
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="group flex items-start gap-5 p-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-violet-100/80 hover:border-violet-200 hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-violet-500/25 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                        <p className="text-slate-500 leading-relaxed text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right visual — animated medical excellence badge */}
              <Reveal direction="right" delay={150}>
                <div className="relative">
                  <div className="absolute -inset-8 bg-gradient-to-br from-violet-200/30 to-purple-200/20 rounded-full blur-3xl animate-pulse-soft pointer-events-none" aria-hidden="true" />

                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-violet-200/60 shadow-2xl shadow-violet-500/10 p-8 lg:p-10 overflow-hidden">
                    {/* Decorative corner accents */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-100 to-transparent rounded-bl-full" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-transparent rounded-tr-full" />

                    <div className="relative aspect-square bg-gradient-to-br from-violet-50 via-white to-purple-50 rounded-2xl flex items-center justify-center overflow-hidden">
                      {/* Heartbeat pulse rings */}
                      <span className="absolute inset-0 m-auto w-40 h-40 rounded-full border-2 border-violet-400/40 animate-heartbeat-ring pointer-events-none" aria-hidden="true" />
                      <span className="absolute inset-0 m-auto w-40 h-40 rounded-full border-2 border-violet-400/30 animate-heartbeat-ring pointer-events-none" style={{ animationDelay: '0.8s' }} aria-hidden="true" />
                      <span className="absolute inset-0 m-auto w-40 h-40 rounded-full border-2 border-violet-400/15 animate-heartbeat-ring pointer-events-none" style={{ animationDelay: '1.6s' }} aria-hidden="true" />

                      <div className="text-center">
                        <div className="relative w-36 h-36 mx-auto mb-6">
                          <div className="w-36 h-36 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full flex items-center justify-center animate-float shadow-2xl shadow-violet-500/30">
                            <svg className="w-18 h-18 text-white animate-scale-pulse" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-slate-800 font-bold text-lg">Medical Excellence</p>
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
      <section id="our-services" className="py-20 lg:py-28 bg-bg-base relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-violet-100/30 to-purple-100/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <Reveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-violet-100/80 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200/60">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                </svg>
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

          {/* 2×2 Grid with glass cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {servicesData.map((service, i) => (
              <Reveal key={service.id} direction="up" delay={i * 120} threshold={0.01}>
                <Link
                  to="/services/$id"
                  params={{ id: service.id }}
                  className="group block relative bg-white/80 backdrop-blur-sm rounded-3xl border border-violet-100/80 p-8 lg:p-10 transition-all duration-500 hover:border-violet-300 hover:shadow-2xl hover:shadow-violet-500/10 hover:bg-white overflow-hidden"
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative">
                    {/* Icon */}
                    <div className="relative w-16 h-16 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl flex items-center justify-center text-3xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-violet-500/15">
                        <span className="transition-all duration-500 group-hover:opacity-0 group-hover:scale-75">
                          {service.icon}
                        </span>
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                          {hoverIcons[service.id] ?? service.icon}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-violet-600 transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-slate-500 leading-relaxed mb-6 text-sm">
                      {service.tagline}
                    </p>

                    {/* Read More */}
                    <span className="group/link inline-flex items-center gap-2 text-violet-600 font-semibold">
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
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Departments Grid ═══ */}
      <section className="py-20 lg:py-28 bg-bg-surface relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6">
          <Reveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-violet-100/80 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200/60">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
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
              className="group/link inline-flex items-center gap-2 text-violet-600 font-semibold hover:text-violet-700 transition-colors"
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
      <section className="py-16 lg:py-20 bg-bg-surface relative">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up">
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 rounded-[2rem] shadow-2xl shadow-violet-500/25">
              {/* Decorative elements */}
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-violet-400/10 rounded-full blur-2xl" />
              <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-white/20 rounded-full animate-float" />
              <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white/15 rounded-full animate-float-slow" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 px-8 sm:px-12 lg:px-16 py-12 lg:py-14">
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-5 border border-white/20">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    Outdoor Doctor
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                    Specialist OPD Consultations Near You
                  </h2>
                  <p className="text-violet-200/80 mb-6 max-w-xl mx-auto lg:mx-0">
                    Book a consultation with our panel of specialists — cardiology, neurology, gastroenterology, ENT, and more — across all Sonoscan branches.
                  </p>
                  <Link
                    to="/outdoor-doctor"
                    className="inline-flex items-center gap-3 bg-white text-violet-700 hover:bg-violet-50 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-xl hover:shadow-violet-900/20 active:scale-[0.97] group"
                  >
                    View Outdoor Doctor Schedule
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
                <div className="shrink-0 hidden sm:block">
                  <div className="w-44 h-44 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-7xl animate-float shadow-lg shadow-white/10">
                    🩺
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ OPD Consultants ═══ */}
      <OPDConsultantsSection
        groups={outdoorDoctorGroups[selectedBranch.id] ?? []}
        branchName={selectedBranch.name}
        previewCount={3}
      />

      <DoctorSection />

      {/* ═══ Appointments CTA Strip ═══ */}
      <section className="py-16 lg:py-20 bg-bg-surface relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-violet-100/40 to-purple-100/30 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <Reveal direction="up" delay={0} threshold={0.01}>
            <div className="inline-flex items-center gap-2 bg-violet-100/80 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200/60">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-subtle" />
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
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:shadow-2xl hover:shadow-violet-500/25 active:scale-95"
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
                className="inline-flex items-center gap-2 border-2 border-violet-200 hover:border-violet-400 text-slate-600 hover:text-slate-900 px-8 py-4 rounded-2xl font-semibold text-lg transition-all"
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
        <section className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-violet-700 to-purple-800 py-14">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-purple-400/10 rounded-full blur-[60px]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} direction="up" delay={i * 200} threshold={0.01}>
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-extrabold text-white mb-1"><CountUp value={stat.value} /></div>
                    <div className="text-violet-200/80 text-sm lg:text-base">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ═══ Pricing Plans Section ═══ */}
      <section className="py-20 lg:py-28 bg-bg-base relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-100/30 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-violet-100/80 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200/60">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
                Pricing Plans
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Flexible Pricing Plan For Your Medical Health Services
              </h2>
              <p className="text-slate-500 mb-8">
                It's important to note that medical practice is governed by ethical principles, including patient confidentiality, informed consent, and the duty to provide.
              </p>

              {/* Monthly / Yearly Toggle */}
              <div className="inline-flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-2xl p-1.5 border border-violet-200/60 shadow-lg shadow-violet-500/5">
                <button
                  onClick={() => setBilling('monthly')}
                  className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                    billing === 'monthly'
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBilling('yearly')}
                  className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
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
                  className={`relative bg-white/80 backdrop-blur-sm rounded-3xl border p-8 lg:p-10 transition-all duration-500 ${
                    plan.popular
                      ? 'border-violet-400 shadow-2xl shadow-violet-500/15 scale-105 lg:scale-110 z-10'
                      : 'border-violet-200/60 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/5'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg shadow-violet-500/25">
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
                    className={`block w-full text-center px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 mb-6 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-xl'
                        : 'bg-violet-50 hover:bg-violet-600 text-violet-700 hover:text-white border border-violet-200 hover:border-violet-600'
                    }`}
                  >
                    Select Plan
                  </Link>

                  <ul className="space-y-3">
                    {planFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600">
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
      <section className="py-20 lg:py-28 bg-bg-surface relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-violet-200/20 to-purple-200/10 rounded-full blur-[120px] animate-float-slow" />
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #5552e7 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Reveal direction="up" delay={0} threshold={0.01}>
            <div className="inline-flex items-center gap-2 bg-violet-100/80 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-violet-200/60">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              Get Started
            </div>
          </Reveal>
          <Reveal direction="up" delay={60} threshold={0.01}>
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
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:shadow-2xl hover:shadow-violet-500/25 active:scale-95"
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
                className="inline-flex items-center gap-2 border-2 border-violet-200 hover:border-violet-400 text-slate-600 hover:text-slate-900 px-8 py-4 rounded-2xl font-semibold text-lg transition-all"
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
