import { useEffect, useState, useMemo } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import SEO from '../ui/SEO'
import { branches, type Branch } from '../../data/branches'
import { appointmentDoctors, teamMembers } from '../../data/doctors'
import { departments } from '../../data/departments'
import { outdoorDoctorGroups } from '../../data/outdoorDoctors'
import { useBranch } from '../../context/BranchContext'
import OPDConsultantsSection from '../ui/OPDConsultantsSection'

const serviceIcons: Record<string, string> = {
  'Primary Care': '\u{1F52C}',
  'Mental Health': '\u{1F9EC}',
  'Dental Care': '\u2764\uFE0F',
  'Eye Care': '\u{1F3E5}',
  'Cardiology': '\u2764\uFE0F',
  'Orthopedics': '\u{1F9B4}',
  'Pediatrics': '\u{1F476}',
  'Gynecology': '\u{1F469}',
}

const branchRoutes: Record<string, '/services/kolkata' | '/services/malda' | '/services/balurghat' | '/services/gangarampur'> = {
  kolkata: '/services/kolkata',
  malda: '/services/malda',
  balurghat: '/services/balurghat',
  gangarampur: '/services/gangarampur',
}

function BranchNotFound() {
  return (
    <>
      <SEO title="Branch Not Found | Sonoscan Healthcare" description="The requested branch could not be found at Sonoscan Healthcare." />
      <section className="min-h-screen bg-bg-base flex items-center justify-center px-6">
        <div className="text-center animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-6 bg-violet-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Branch Not Found</h1>
          <p className="text-slate-500 mb-8">The branch location you're looking for doesn't exist.</p>
          <Link to="/services" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all">View All Locations</Link>
        </div>
      </section>
    </>
  )
}

function BranchContent({ branch }: { branch: Branch }) {
  const branchIndex = branches.findIndex(b => b.id === branch.id)
  const prevBranch = branchIndex > 0 ? branches[branchIndex - 1] : null
  const nextBranch = branchIndex < branches.length - 1 ? branches[branchIndex + 1] : null

  const branchDoctors = appointmentDoctors.filter(doc => doc.branchIds.includes(branch.id))

  const [docSearch, setDocSearch] = useState('')
  const [docSpecFilter, setDocSpecFilter] = useState('all')
  const [docSpecOpen, setDocSpecOpen] = useState(false)
  const [showEmptyDepts, setShowEmptyDepts] = useState(false)
  const [deptChipFilter, setDeptChipFilter] = useState('all')

  const docSpecialtyIcons: Record<string, string> = {
    Cardiology: '❤️', Neurology: '🧠', Gastroenterology: '🦠', ENT: '👂',
    'Paediatric Cardiology': '👶', PFT: '🫁', Pathology: '🔬', Radiology: '🩻',
  }

  const docSpecialties = useMemo(() => {
    const set = new Set(branchDoctors.map(d => d.specialty))
    return ['all', ...Array.from(set).sort()]
  }, [branchDoctors])

  const filteredDoctors = useMemo(() => {
    const q = docSearch.toLowerCase().trim()
    return branchDoctors.filter(doc => {
      if (docSpecFilter !== 'all' && doc.specialty !== docSpecFilter) return false
      if (q && !doc.name.toLowerCase().includes(q) && !doc.specialty.toLowerCase().includes(q)) return false
      return true
    })
  }, [branchDoctors, docSearch, docSpecFilter])

  const filteredDoctorsGrouped = useMemo(() => {
    const groups = new Map<string, typeof filteredDoctors>()
    for (const dept of departments) groups.set(dept.name, [])
    for (const doc of filteredDoctors) {
      const deptName = doc.specialty.includes('—') ? doc.specialty.split('—')[1].trim() : doc.specialty
      const arr = groups.get(deptName) ?? []
      arr.push(doc)
      groups.set(deptName, arr)
    }
    return new Map(Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b)))
  }, [filteredDoctors])

  const deptIconMap = useMemo(() => {
    const map = new Map<string, string>()
    for (const dept of departments) map.set(dept.name, dept.icon)
    return map
  }, [])

  const deptChips = useMemo(() => {
    const availableDepartments = new Set<string>()
    for (const doc of branchDoctors) {
      const department = doc.specialty.includes('—') ? doc.specialty.split('—')[1].trim() : doc.specialty
      availableDepartments.add(department)
    }
    return Array.from(availableDepartments)
      .sort((a, b) => a.localeCompare(b))
      .map(name => ({ name, icon: deptIconMap.get(name) ?? '🩺' }))
  }, [branchDoctors, deptIconMap])

  const opdGroups = outdoorDoctorGroups[branch.id] ?? []
  const getDoctorSlug = (name: string) => teamMembers.find(t => t.name === name)?.slug ?? ''

  const branchServiceData = branch.services.map(name => {
    const deptSlug = name.toLowerCase().replace(/\s+/g, '-')
    const dept = departments.find(d => d.id === deptSlug)
    return { name, deptSlug, tagline: dept?.tagline, description: dept?.description }
  })

  return (
    <>
      <section className="relative min-h-[560px] overflow-hidden bg-[#1c2730] pt-20 lg:pt-24">
        <div className="absolute inset-0 pointer-events-none opacity-60" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="relative mx-auto min-h-[460px] max-w-none px-6 pb-10 lg:pb-14 lg:px-[max(1.5rem,calc((100vw-80rem)/2))]">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 mb-12" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#e2644a] transition-colors">Home</Link><span className="text-slate-300">/</span><Link to="/services" className="hover:text-[#e2644a] transition-colors">Locations</Link><span className="text-slate-300">/</span><span className="text-[#e2644a]">{branch.name}</span>
          </nav>
          <div className="relative min-h-[400px] lg:min-h-[460px]">
            <div className="relative z-10 max-w-xl rounded-[2rem] bg-[#fbfaf7]/95 p-7 shadow-2xl shadow-black/20 backdrop-blur-sm lg:mt-12 lg:p-10 animate-fade-in-up">
              <p className="inline-flex items-center gap-2 text-[#e2644a] text-sm font-bold uppercase tracking-[0.2em] mb-6"><span className="w-8 h-px bg-[#e2644a]" /> Sonoscan Healthcare</p>
              <h1 className="max-w-xl text-6xl sm:text-7xl lg:text-[7.5rem] font-black tracking-[-0.07em] leading-[0.82] text-[#1c2730]">{branch.name}<span className="text-[#e2644a]">.</span></h1>
              <p className="max-w-md mt-8 text-lg leading-relaxed text-slate-600">A complete diagnostic partner for {branch.name}, bringing accurate testing, specialist care, and a calmer healthcare experience closer to home.</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/appointments" className="inline-flex items-center gap-3 bg-[#1c2730] text-white px-6 py-3.5 rounded-full font-bold text-sm hover:bg-[#e2644a] transition-colors">Book an appointment<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg></Link>
                <a href={`tel:${branch.phone.split('/')[0].replace(/[^0-9]/g, '').trim()}`} className="inline-flex items-center gap-2 border border-[#1c2730]/20 text-[#1c2730] px-6 py-3.5 rounded-full font-bold text-sm hover:border-[#e2644a] hover:text-[#e2644a] transition-colors">Call {branch.phone.split('/')[0].trim()}</a>
              </div>
              <p className="mt-6 border-t border-[#1c2730]/10 pt-4 text-sm leading-relaxed text-slate-500 lg:hidden"><span className="font-bold text-[#1c2730]">Find us:</span> {branch.address}</p>
            </div>
            <div className="absolute inset-0 min-h-[400px] lg:min-h-[460px] animate-fade-in-up" style={{ animationDelay: '180ms', animationFillMode: 'both' }}>
              <div className="absolute -top-5 -right-4 lg:right-8 z-10 w-28 h-28 bg-[#d8e7dc] rounded-full flex items-center justify-center text-center rotate-12"><span className="text-xs font-black uppercase leading-tight text-[#1c5948]">Care<br />nearby<br />since 1998</span></div>
              <div className="h-full min-h-[400px] lg:min-h-[460px] overflow-hidden rounded-[2rem] rounded-br-[8rem] bg-slate-200 shadow-2xl shadow-[#1c2730]/15"><img src={branch.image} alt={`${branch.name} Sonoscan Healthcare centre`} className="w-full h-full min-h-[400px] lg:min-h-[460px] object-cover" loading="eager" /><div className="absolute inset-0 rounded-[2rem] rounded-br-[8rem] bg-gradient-to-r from-[#1c2730]/35 via-transparent to-[#1c2730]/10" /></div>
              <div className="absolute bottom-6 left-6 right-6 z-20 hidden bg-[#1c2730]/95 text-white p-5 rounded-2xl lg:left-[52%] lg:right-8 lg:flex items-start gap-4 backdrop-blur-sm"><svg className="w-5 h-5 mt-0.5 shrink-0 text-[#f0b35b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f0b35b] mb-1">Find us</p><p className="text-sm leading-relaxed text-white/80">{branch.address}</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-0 z-40 border-b border-[#1c2730]/10 bg-[#fbfaf7]/95 backdrop-blur-md" aria-label="Choose a branch">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3 scrollbar-hide">
          <span className="mr-2 flex shrink-0 items-center text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Visit</span>
          {branches.map((location, index) => {
            const isActive = location.id === branch.id
            return (
              <Link
                key={location.id}
                to={branchRoutes[location.id]}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors ${isActive ? 'border-[#1c2730] bg-[#1c2730] text-white' : 'border-[#1c2730]/15 bg-white text-slate-600 hover:border-[#e2644a] hover:text-[#e2644a]'}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={`text-xs ${isActive ? 'text-[#f0b35b]' : 'text-[#e2644a]'}`}>{String(index + 1).padStart(2, '0')}</span>
                {location.name}
              </Link>
            )
          })}
        </div>
      </nav>

      <section className="bg-[#1c2730] text-white border-y border-white/10"><div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10">{[{ value: branchDoctors.length, label: 'specialist doctors' }, { value: branch.services.length, label: 'care departments' }, { value: branch.doctorCount, label: 'team members' }, { value: '7 AM–9 PM', label: 'open every day' }].map(item => <div key={item.label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2"><strong className="text-xl lg:text-2xl font-black text-[#f0b35b]">{item.value}</strong><span className="text-xs uppercase tracking-[0.12em] text-white/55">{item.label}</span></div>)}</div></section>

      <section className="bg-[#fbfaf7] py-20 lg:py-28"><div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.72fr_1.28fr] gap-14 lg:gap-24">
        <div><p className="text-[#e2644a] text-sm font-bold uppercase tracking-[0.2em] mb-5">The local difference</p><h2 className="text-4xl lg:text-5xl font-black tracking-[-0.045em] leading-[0.95] text-[#1c2730]">Your health,<br /><span className="text-[#e2644a]">closer to home.</span></h2><p className="mt-7 text-slate-600 leading-relaxed">{branch.description}</p><div className="mt-8 pt-6 border-t border-[#1c2730]/10"><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400 mb-2">Hours</p><p className="font-bold text-[#1c2730]">{branch.hours}</p></div></div>
        <div><div className="flex items-end justify-between gap-4 mb-8"><div><p className="text-[#1c5948] text-sm font-bold uppercase tracking-[0.2em] mb-3">What we offer</p><h2 className="text-3xl lg:text-4xl font-black tracking-[-0.04em] text-[#1c2730]">Care, in every direction.</h2></div><span className="hidden sm:block text-5xl font-black text-[#d8e7dc]">01—{String(branchServiceData.length).padStart(2, '0')}</span></div><div className="grid sm:grid-cols-2 gap-3">{branchServiceData.map(({ name, deptSlug, tagline }, index) => <Link key={name} to="/departments/$id" params={{ id: deptSlug }} className="group min-h-[150px] bg-white border border-[#1c2730]/10 p-5 rounded-2xl hover:-translate-y-1 hover:border-[#e2644a]/60 hover:shadow-xl hover:shadow-[#1c2730]/5 transition-all"><div className="flex items-start justify-between gap-3 mb-8"><span className="text-xs font-black text-[#e2644a]">{String(index + 1).padStart(2, '0')}</span><svg className="w-4 h-4 text-slate-300 group-hover:text-[#e2644a] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg></div><h3 className="font-black text-[#1c2730] group-hover:text-[#e2644a] transition-colors">{name}</h3><p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{tagline ?? 'Available at this centre'}</p></Link>)}</div></div>
      </div></section>

      <section className="bg-[#d8e7dc] py-16 lg:py-20"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[1fr_auto] gap-8 items-center"><div><p className="text-[#1c5948] text-sm font-bold uppercase tracking-[0.2em] mb-3">Need a little help?</p><h2 className="text-3xl lg:text-4xl font-black tracking-[-0.04em] text-[#1c2730]">Talk to the {branch.name} team.</h2><p className="mt-3 text-[#1c5948]/80 max-w-xl">Ask about tests, reports, timings, or the right specialist for you.</p></div><a href={`https://wa.me/91${branch.whatsapp.split('/')[0].replace(/[^0-9]/g, '').trim()}?text=${encodeURIComponent(`Hi! I would like to know more about services at your ${branch.name} branch.`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#1c5948] text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-[#e2644a] transition-colors">Message on WhatsApp <span aria-hidden="true">↗</span></a></div></section>

      {branchDoctors.length > 0 && <section className="bg-[#fbfaf7] py-20 lg:py-28"><div className="max-w-7xl mx-auto px-6"><div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"><div><p className="text-[#e2644a] text-sm font-bold uppercase tracking-[0.2em] mb-3">Meet your care team</p><h2 className="text-4xl font-black tracking-[-0.04em] text-[#1c2730]">Doctors at {branch.name}</h2></div><Link to="/doctors" className="font-bold text-sm text-[#1c5948] hover:text-[#e2644a] transition-colors">View full team ↗</Link></div><div className="flex flex-col md:flex-row gap-3 mb-5"><label className="relative flex-1"><span className="sr-only">Search doctors</span><svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg><input type="search" value={docSearch} onChange={event => setDocSearch(event.target.value)} placeholder="Search by doctor or specialty" className="w-full rounded-xl border border-[#1c2730]/15 bg-white py-3.5 pl-11 pr-4 text-sm text-[#1c2730] outline-none focus:border-[#e2644a]" /></label><label className="md:w-64"><span className="sr-only">Filter by specialty</span><select value={docSpecFilter} onChange={event => setDocSpecFilter(event.target.value)} className="w-full rounded-xl border border-[#1c2730]/15 bg-white px-4 py-3.5 text-sm text-[#1c2730] outline-none focus:border-[#e2644a]"><option value="all">All specialties</option>{docSpecialties.filter(spec => spec !== 'all').map(spec => <option key={spec} value={spec}>{spec}</option>)}</select></label></div><div className="flex flex-wrap gap-2 mb-8"><button type="button" onClick={() => setDeptChipFilter('all')} className={`rounded-full border px-4 py-2 text-xs font-bold transition-colors ${deptChipFilter === 'all' ? 'border-[#1c5948] bg-[#1c5948] text-white' : 'border-[#1c2730]/15 bg-white text-slate-600 hover:border-[#1c5948]'}`}>All departments</button>{deptChips.map(({ name, icon }) => <button key={name} type="button" onClick={() => setDeptChipFilter(deptChipFilter === name ? 'all' : name)} className={`rounded-full border px-4 py-2 text-xs font-bold transition-colors ${deptChipFilter === name ? 'border-[#e2644a] bg-[#e2644a] text-white' : 'border-[#1c2730]/15 bg-white text-slate-600 hover:border-[#e2644a]'}`}><span className="mr-1.5">{icon}</span>{name}</button>)}</div><p className="mb-5 text-sm text-slate-500">Showing {filteredDoctors.length} of {branchDoctors.length} doctors</p><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{Array.from(filteredDoctorsGrouped.entries()).filter(([dept, docs]) => docs.length > 0 && (deptChipFilter === 'all' || dept === deptChipFilter)).map(([dept, docs]) => <div key={dept} className="overflow-hidden rounded-2xl border border-[#1c2730]/10 bg-white"><div className="flex items-center justify-between bg-[#1c2730] px-5 py-4"><h3 className="font-black text-white">{dept}</h3><span className="rounded-full bg-[#f0b35b] px-2.5 py-1 text-xs font-black text-[#1c2730]">{docs.length}</span></div><div className="divide-y divide-[#1c2730]/10">{docs.map(doc => { const slug = getDoctorSlug(doc.name); return <Link key={doc.name} to="/doctors/$slug" params={{ slug }} className="group flex items-center gap-3 px-5 py-4 hover:bg-[#f5f1e9] transition-colors"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d8e7dc] text-xs font-black text-[#1c5948]">{doc.initials}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-[#1c2730] group-hover:text-[#e2644a]">{doc.name}</p><p className="truncate text-xs text-slate-500">{doc.specialty}</p></div><span className="text-slate-300 group-hover:text-[#e2644a]">↗</span></Link> })}</div></div>)}</div>{filteredDoctors.length === 0 && <div className="rounded-2xl border border-dashed border-[#1c2730]/20 bg-white py-12 text-center text-sm text-slate-500">No doctors found. Try another search or filter.</div>}</div></section>}
      {opdGroups.length > 0 && <OPDConsultantsSection groups={opdGroups} branchName={branch.name} />}
    </>
  )

  return (
    <>
      {/* ═══ SPLIT HERO ═══ */}
      <section className="relative min-h-screen bg-[#0a0715] -mt-16 lg:-mt-28 overflow-hidden">
        {/* Animated mesh gradient on right half */}
        <div className="absolute inset-0 lg:w-1/2 lg:left-auto pointer-events-none" style={{ zIndex: 1 }}>
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/90 via-purple-700/80 to-indigo-800/90" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-400/15 rounded-full blur-[100px] animate-float-slow" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>

        {/* Left: Branch Image */}
        <div className="relative lg:absolute lg:inset-y-0 lg:left-0 lg:w-[55%] h-[50vh] lg:h-full z-10">
          <img src={branch.image} alt={branch.name} className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0715]/80 lg:to-[#0a0715]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0715]/60 via-transparent to-transparent lg:from-transparent" />
        </div>

        {/* Right: Content overlay */}
        <div className="relative z-20 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[50%] flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 py-20 lg:py-0 lg:pl-16 xl:pl-24">
            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-white/40 mb-6" aria-label="Breadcrumb">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link to="/services" className="hover:text-white transition-colors">Locations</Link>
                <span>/</span>
                <span className="text-white/80">{branch.name}</span>
              </nav>

              {/* Big branch number */}
              <div className="text-[8rem] lg:text-[10rem] font-black text-white/[0.04] leading-none -mb-16 lg:-mb-20 select-none pointer-events-none">
                {String(branchIndex + 1).padStart(2, '0')}
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-4 relative">
                {branch.name}
              </h1>

              <div className="w-16 h-1 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full mb-6" />

              <p className="text-base lg:text-lg text-white/60 leading-relaxed max-w-md mb-8">
                {branch.address}
              </p>

              {/* Floating stat pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  { label: branch.hours, icon: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' },
                  { label: `${branchDoctors.length} Doctors`, icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' },
                  { label: `${branch.services.length} Services`, icon: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z' },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-2 bg-white/8 backdrop-blur-md text-white/70 text-sm px-4 py-2.5 rounded-full border border-white/10">
                    <svg className="w-4 h-4 text-violet-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                    </svg>
                    {s.label}
                  </div>
                ))}
              </div>

              {/* CTA row */}
              <div className="flex flex-wrap gap-3 mt-8">
                <a href={`tel:${branch.phone.split('/')[0].replace(/[^0-9]/g, '').trim()}`} className="inline-flex items-center gap-2.5 bg-white text-[#0a0715] px-7 py-3.5 rounded-2xl font-bold text-sm transition-all hover:shadow-2xl hover:shadow-white/20 active:scale-[0.97]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25Z" />
                  </svg>
                  Call Now
                </a>
                <Link to="/appointments" className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:border-white/40 px-7 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:bg-white/5">
                  Book Appointment
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-fade-in-up" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/40 rounded-full animate-pulse-subtle" />
          </div>
        </div>
      </section>

      {/* ═══ BRANCH TABS ═══ */}
      <section className="bg-white border-b border-violet-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-1 scrollbar-hide">
            {branches.map((b) => {
              const isActive = b.id === branch.id
              return (
                <Link
                  key={b.id}
                  to="/services/$id"
                  params={{ id: b.id }}
                  className={`relative shrink-0 flex items-center gap-2 px-5 py-3.5 text-sm font-semibold rounded-t-xl transition-all ${
                    isActive
                      ? 'text-violet-700 bg-violet-50'
                      : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {isActive && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full" />}
                  <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${isActive ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {String(branches.indexOf(b) + 1).padStart(2, '0')}
                  </span>
                  {b.name}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT + SERVICES — SIDE BY SIDE ═══ */}
      <section className="py-16 lg:py-24 bg-bg-base relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-violet-100/40 to-purple-100/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left: About — 2 cols */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <span className="text-violet-500 font-bold text-sm tracking-widest uppercase">About</span>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mt-2 mb-6 leading-tight">
                  {branch.name}
                  <span className="block text-lg font-normal text-slate-400 mt-1">Branch Overview</span>
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">{branch.description}</p>

                {/* Quick contact */}
                <div className="mt-8 p-5 bg-violet-50/80 rounded-2xl border border-violet-100/60">
                  <p className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-3">Quick Contact</p>
                  <div className="space-y-2">
                    <a href={`tel:${branch.phone.split('/')[0].replace(/[^0-9]/g, '').trim()}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-violet-600 transition-colors">
                      <svg className="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25Z" /></svg>
                      {branch.phone}
                    </a>
                    <a href={`mailto:${branch.email}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-violet-600 transition-colors">
                      <svg className="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                      {branch.email}
                    </a>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                      {branch.hours}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Services — 3 cols */}
            <div className="lg:col-span-3">
              <span className="text-violet-500 font-bold text-sm tracking-widest uppercase">Services</span>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mt-2 mb-8 leading-tight">
                Available Here
              </h2>

              {/* Horizontal scroll service cards */}
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory scrollbar-hide">
                {branchServiceData.map(({ name, deptSlug, tagline }, i) => {
                  const icon = serviceIcons[name] ?? '\u{1FA7A}'
                  return (
                    <Link
                      key={name}
                      to="/departments/$id"
                      params={{ id: deptSlug }}
                      className="group snap-start shrink-0 w-52 bg-white rounded-2xl border border-violet-100/60 p-5 transition-all duration-300 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">{icon}</span>
                        <span className="text-xs font-bold text-slate-300">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <p className="font-bold text-slate-900 text-sm mb-1 group-hover:text-violet-600 transition-colors">{name}</p>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{tagline ?? 'Available at this branch'}</p>
                      <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        View details
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY VISIT — FULL WIDTH BANNER ═══ */}
      <section className="relative py-16 lg:py-20 bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[60px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-violet-300 font-bold text-sm tracking-widest uppercase">Why Choose Us</span>
            <h2 className="text-3xl lg:text-4xl font-black text-white mt-2">
              Why Visit {branch.name}?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Affordable Care', desc: 'Competitive pricing and flexible payment options to make healthcare accessible for everyone.' },
              { icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0ZM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632Z', title: 'Experienced Team', desc: `Our ${branchDoctors.length} dedicated doctors and specialists bring decades of combined experience.` },
              { icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0Z', title: 'Convenient Hours', desc: branch.hours },
              { icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z', title: 'Modern Facility', desc: 'Fully equipped with the latest medical technology for accurate diagnosis and care.' },
            ].map(item => (
              <div key={item.title} className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                </div>
                <h3 className="font-bold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DOCTORS — BENTO GRID ═══ */}
      {branchDoctors.length > 0 && (
        <section className="py-16 lg:py-24 bg-bg-surface relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-violet-500 font-bold text-sm tracking-widest uppercase">Medical Team</span>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mt-2">
                  Our Doctors
                </h2>
              </div>
              <Link to="/doctors" className="text-sm text-violet-600 font-semibold hover:text-violet-700 flex items-center gap-1">
                Meet our full team
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>

            {/* Search + Filter bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607Z" /></svg>
                <input type="text" placeholder="Search by name or specialty…" value={docSearch} onChange={e => setDocSearch(e.target.value)} className="w-full pl-10 pr-8 py-3 rounded-xl border border-violet-200/60 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all" />
                {docSearch && (
                  <button onClick={() => setDocSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors" aria-label="Clear search">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>

              <div className="relative w-full sm:w-64">
                <button type="button" onClick={() => setDocSpecOpen(prev => !prev)} onBlur={() => setTimeout(() => setDocSpecOpen(false), 150)} className="w-full flex items-center gap-2 pl-3.5 pr-8 py-3 rounded-xl border border-violet-200/60 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all cursor-pointer text-left">
                  <span className="text-base leading-none">{docSpecFilter === 'all' ? '🩺' : (docSpecialtyIcons[docSpecFilter] ?? '🩺')}</span>
                  <span className="flex-1 truncate">{docSpecFilter === 'all' ? 'All Specialties' : docSpecFilter}</span>
                </button>
                {docSpecOpen && (
                  <div className="absolute z-50 mt-1.5 w-full bg-white border border-violet-200/60 rounded-xl shadow-2xl shadow-violet-500/10 py-1 max-h-52 overflow-y-auto">
                    {docSpecialties.map(spec => {
                      const label = spec === 'all' ? 'All Specialties' : spec
                      const icon = spec === 'all' ? '🩺' : (docSpecialtyIcons[spec] ?? '🩺')
                      const active = docSpecFilter === spec
                      return (
                        <button key={spec} type="button" onClick={() => { setDocSpecFilter(spec); setDocSpecOpen(false) }} className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors ${active ? 'bg-violet-100 text-violet-700 font-medium' : 'text-slate-700 hover:bg-violet-50'}`}>
                          <span className="text-base leading-none w-5 text-center">{icon}</span>
                          <span className="flex-1 truncate">{label}</span>
                          {active && <svg className="w-4 h-4 text-violet-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>}
                        </button>
                      )
                    })}
                  </div>
                )}
                <svg className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none transition-transform ${docSpecOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
              </div>
            </div>

            {(docSearch || docSpecFilter !== 'all') && (
              <p className="text-xs text-slate-400 mb-4">
                Showing {filteredDoctors.length} of {branchDoctors.length} doctors
                {docSpecFilter !== 'all' && <> in {docSpecFilter}</>}
                {docSearch && <> matching &ldquo;{docSearch}&rdquo;</>}
              </p>
            )}

            {/* Department chip filters */}
            {deptChips.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                <button type="button" onClick={() => setDeptChipFilter('all')} className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${deptChipFilter === 'all' ? 'bg-violet-600 text-white border-violet-600 shadow-sm' : 'bg-white text-slate-600 border-violet-200/60 hover:border-violet-300 hover:text-violet-600'}`}>All</button>
                {deptChips.map(({ name, icon }) => (
                  <button key={name} type="button" onClick={() => setDeptChipFilter(prev => prev === name ? 'all' : name)} className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${deptChipFilter === name ? 'bg-violet-600 text-white border-violet-600 shadow-sm' : 'bg-white text-slate-600 border-violet-200/60 hover:border-violet-300 hover:text-violet-600'}`}>
                    <span className="text-sm leading-none">{icon}</span>{name}
                  </button>
                ))}
              </div>
            )}

            {/* Hide-empty toggle */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs text-slate-400">
                {Array.from(filteredDoctorsGrouped.entries()).filter(([dept, d]) => (showEmptyDepts || d.length > 0) && (deptChipFilter === 'all' || dept === deptChipFilter)).filter(([, d]) => d.length > 0).length} of {filteredDoctorsGrouped.size} departments have doctors
              </p>
              <button type="button" onClick={() => setShowEmptyDepts(prev => !prev)} className="inline-flex items-center gap-2 text-xs font-medium text-violet-600 hover:text-violet-700 transition-colors">
                <span className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200">
                  <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform duration-200 ${showEmptyDepts ? 'translate-x-[18px] bg-violet-500' : 'translate-x-1 bg-slate-300'}`} />
                </span>
                {showEmptyDepts ? 'Showing all' : 'Hiding empty'}
              </button>
            </div>

            {/* Doctor groups — Bento Grid */}
            {Array.from(filteredDoctorsGrouped.values()).filter(d => showEmptyDepts || d.length > 0).length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from(filteredDoctorsGrouped.entries())
                  .filter(([dept, docs]) => (showEmptyDepts || docs.length > 0) && (deptChipFilter === 'all' || dept === deptChipFilter))
                  .map(([dept, docs]) => (
                  <div key={dept} className="group bg-white rounded-2xl border border-violet-100/60 overflow-hidden transition-all duration-300 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/5">
                    {/* Dept header with gradient */}
                    <div className="relative px-5 py-4 bg-gradient-to-r from-violet-600 to-purple-600 overflow-hidden">
                      <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
                      <h3 className="relative text-sm font-bold text-white">
                        {dept}
                        <span className="ml-2 text-white/60 font-medium">({docs.length})</span>
                      </h3>
                    </div>
                    <div className="divide-y divide-violet-50/80">
                      {docs.map(doc => {
                        const slug = getDoctorSlug(doc.name)
                        const qual = doc.specialty.includes('—') ? doc.specialty.split('—')[0].trim() : ''
                        return (
                          <Link key={doc.name} to="/doctors/$slug" params={{ slug }} className="flex items-center gap-3 px-5 py-3.5 hover:bg-violet-50/40 transition-colors group/row">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center shrink-0 group-hover/row:from-violet-500 group-hover/row:to-purple-500 transition-all duration-300">
                              <svg className="w-4 h-4 text-violet-500 group-hover/row:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-semibold text-slate-900 group-hover/row:text-violet-600 transition-colors block truncate">{doc.name}</span>
                              {qual && <span className="text-xs text-slate-400 block truncate">{qual}</span>}
                            </div>
                            <svg className="w-4 h-4 text-slate-300 group-hover/row:text-violet-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-violet-100/60">
                <p className="text-slate-400 text-sm">No doctors found matching your criteria</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══ OPD CONSULTANTS ═══ */}
      {opdGroups.length > 0 && (
        <OPDConsultantsSection groups={opdGroups} branchName={branch.name} />
      )}

      {/* ═══ FLOATING SIDEBAR + WHATSAPP ═══ */}
      <section className="py-16 lg:py-24 bg-bg-surface relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left 2 cols: WhatsApp CTA */}
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-600 to-green-700 rounded-3xl shadow-2xl shadow-emerald-500/20">
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-emerald-500/20 rounded-full blur-2xl" />
                <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-white/15 rounded-full animate-float" />

                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8 p-8 sm:p-10 lg:p-12">
                  <div className="flex-1 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4 border border-white/20">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                      Quick & Easy
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-black text-white mb-2">
                      Chat About {branch.name}
                    </h3>
                    <p className="text-emerald-100/70 text-sm mb-6 max-w-md">
                      Have questions about services, pricing, or appointments? Send us a message on WhatsApp.
                    </p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-6">
                      {['Quick replies', 'Share reports', 'Book appointments'].map(b => (
                        <span key={b} className="inline-flex items-center gap-1.5 bg-white/10 text-white text-xs px-3 py-1.5 rounded-full border border-white/10">
                          <svg className="w-3 h-3 text-emerald-300" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                          {b}
                        </span>
                      ))}
                    </div>
                    <a href={`https://wa.me/91${branch.whatsapp.split('/')[0].replace(/[^0-9]/g, '').trim()}?text=${encodeURIComponent('Hi! I am interested in services at your ' + branch.name + ' branch. Could you share details about the diagnostic tests, pricing, and available doctors?')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 bg-white text-emerald-700 hover:bg-emerald-50 px-7 py-3.5 rounded-2xl font-bold text-sm transition-all hover:shadow-xl active:scale-[0.97] group">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                      Ask About {branch.name}
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                    </a>
                  </div>

                  <div className="shrink-0">
                    <div className="bg-white rounded-3xl p-4 shadow-xl text-center">
                      <img src={'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent('https://wa.me/91' + branch.whatsapp.split('/')[0].replace(/[^0-9]/g, '').trim() + '?text=' + encodeURIComponent('Hi! I am interested in services at your ' + branch.name + ' branch.'))} alt="Scan to chat on WhatsApp" className="w-36 h-36 rounded-2xl" loading="lazy" />
                      <p className="text-xs text-slate-500 mt-2 font-semibold">Scan to chat</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 1 col: Floating sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-5">
                {/* Quick Facts */}
                <div className="relative bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 rounded-3xl p-6 text-white overflow-hidden shadow-xl shadow-violet-500/20">
                  <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/5 rounded-full blur-2xl" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4">Quick Facts</h3>
                  <div className="grid grid-cols-2 gap-4 relative">
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-2xl font-black">{branchDoctors.length}</p>
                      <p className="text-[11px] text-white/60 mt-0.5">Doctors</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-2xl font-black">{branch.services.length}</p>
                      <p className="text-[11px] text-white/60 mt-0.5">Services</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-2xl font-black">{branch.doctorCount}</p>
                      <p className="text-[11px] text-white/60 mt-0.5">Total Staff</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-2xl font-black">{branch.services.length * 3}+</p>
                      <p className="text-[11px] text-white/60 mt-0.5">Monthly Patients</p>
                    </div>
                  </div>
                </div>

                {/* Services mini-list */}
                <div className="bg-white rounded-3xl p-5 border border-violet-100/60 shadow-lg shadow-violet-500/5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Services</h3>
                  <div className="space-y-1">
                    {branchServiceData.map(({ name, deptSlug }) => {
                      const icon = serviceIcons[name] ?? '\u{1FA7A}'
                      return (
                        <Link key={name} to="/departments/$id" params={{ id: deptSlug }} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-600 hover:text-violet-600 hover:bg-violet-50/50 transition-colors">
                          <span className="text-base">{icon}</span>
                          <span className="truncate">{name}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* Doctors mini-list */}
                {branchDoctors.length > 0 && (
                  <div className="bg-white rounded-3xl p-5 border border-violet-100/60 shadow-lg shadow-violet-500/5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Doctors</h3>
                    <div className="space-y-1">
                      {branchDoctors.slice(0, 5).map(doc => {
                        const slug = getDoctorSlug(doc.name)
                        return (
                          <Link key={doc.name} to="/doctors/$slug" params={{ slug }} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-600 hover:text-violet-600 hover:bg-violet-50/50 transition-colors">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center text-violet-600 font-bold text-[10px] shrink-0">{doc.initials}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{doc.name}</p>
                              <p className="text-[11px] text-slate-400 truncate">{doc.specialty}</p>
                            </div>
                          </Link>
                        )
                      })}
                      {branchDoctors.length > 5 && (
                        <Link to="/doctors" className="block text-center text-xs text-violet-600 font-semibold pt-2 hover:text-violet-700 transition-colors">
                          +{branchDoctors.length - 5} more
                        </Link>
                      )}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="space-y-3">
                  <a href={`tel:${branch.phone.split('/')[0].replace(/[^0-9]/g, '').trim()}`} className="block w-full text-center bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-3.5 rounded-2xl font-semibold text-sm transition-all hover:shadow-xl hover:shadow-violet-500/25 active:scale-[0.98]">
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25Z" /></svg>
                      Call Now
                    </span>
                  </a>
                  <a href={`https://wa.me/91${branch.whatsapp.split('/')[0].replace(/[^0-9]/g, '').trim()}?text=${encodeURIComponent(`Hi! I would like to know more about Sonoscan Healthcare services available at your ${branch.name} branch. Can you share details about the diagnostic tests and how I can book an appointment?`)}`} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3.5 rounded-2xl font-semibold text-sm transition-all hover:shadow-xl hover:shadow-emerald-500/25 active:scale-[0.98]">
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                      WhatsApp
                    </span>
                  </a>
                  <Link to="/appointments" className="block w-full text-center border-2 border-violet-200 hover:border-violet-400 text-slate-600 hover:text-slate-900 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:shadow-lg">
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Branch navigation */}
          <div className="flex justify-between mt-16 pt-8 border-t border-violet-200/60">
            {prevBranch ? (
              <Link to="/services/$id" params={{ id: prevBranch!.id }} className="flex items-center gap-3 text-slate-500 hover:text-violet-600 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-violet-50 group-hover:bg-violet-100 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs text-slate-400">Previous</p>
                  <p className="text-sm font-semibold">{prevBranch!.name}</p>
                </div>
              </Link>
            ) : <div />}
            {nextBranch && (
              <Link to="/services/$id" params={{ id: nextBranch!.id }} className="flex items-center gap-3 text-slate-500 hover:text-violet-600 transition-colors group">
                <div className="hidden sm:block text-right">
                  <p className="text-xs text-slate-400">Next</p>
                  <p className="text-sm font-semibold">{nextBranch!.name}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-violet-50 group-hover:bg-violet-100 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default function BranchDetailPage() {
  const { pathname } = useLocation()
  const branchId = pathname.split('/').pop()!
  const branch = branches.find(b => b.id === branchId)
  const { setSelectedBranch } = useBranch()

  useEffect(() => {
    if (branch) setSelectedBranch(branch)
  }, [branch, setSelectedBranch])

  if (!branch) return <BranchNotFound />

  return (
    <>
      <SEO
        title={`${branch.name} Branch | Sonoscan Healthcare`}
        description={`Visit our ${branch.name} branch at ${branch.address}. ${branch.description.slice(0, 120)} Book an appointment today.`}
      />
      <BranchContent branch={branch} />
    </>
  )
}
