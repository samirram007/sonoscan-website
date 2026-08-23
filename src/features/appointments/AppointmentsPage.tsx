import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import SEO from '../ui/SEO'
import { opdAppointmentDoctors as doctors } from '../../data/outdoorDoctors'
import { timeSlots, dayNames } from '../../data/appointments'
import { AppointmentFormSchema } from './schema'
import { useBranch } from '../../context/BranchContext'
import BrandWave from '../ui/BrandWave'

interface BookingData {
  name: string
  email: string
  phone: string
  notes?: string
  branchId: string
  branchName: string
  doctor: string
  date: string
  time: string
}

function getMinDate(): string {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

function getMaxDate(): string {
  const d = new Date()
  d.setDate(d.getDate() + 60)
  return d.toISOString().split('T')[0]
}

export default function AppointmentsPage() {
  const [step, setStep] = useState(1)
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [bookingData, setBookingData] = useState<BookingData | null>(null)

  const handleBook = () => {
    if (selectedDoctor === null || !selectedDate || !selectedTime) return

    const result = AppointmentFormSchema.safeParse(form)
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
    setBookingData({
      ...result.data,
      branchId: selectedBranch.id,
      branchName: selectedBranch.name,
      doctor: selectedDoctorData?.name ?? '',
      date: selectedDate,
      time: selectedTime,
    })
    setSubmitted(true)
  }

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors(prev => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const reset = () => {
    setStep(1)
    setSelectedDoctor(null)
    setSelectedDate('')
    setSelectedTime('')
    setForm({ name: '', email: '', phone: '', notes: '' })
    setFormErrors({})
    setSubmitted(false)
    setBookingData(null)
  }

  const { selectedBranch } = useBranch()

  // Filter doctors by selected branch
  const branchDoctors = doctors.filter(doc => doc.branchIds.includes(selectedBranch.id))

  // Reset selected doctor when branch changes
  useEffect(() => {
    setSelectedDoctor(null)
    setStep(1)
  }, [selectedBranch.id])

  // Map filtered index back to actual doctor index in full array
  const getActualIndex = (filteredIndex: number) => {
    const doc = branchDoctors[filteredIndex]
    return doctors.findIndex(d => d.name === doc.name)
  }

  const selectedDoctorData = selectedDoctor !== null ? doctors[selectedDoctor] : null

  // Get doctor's per-branch availability for the selected branch
  const currentBranchSchedule = selectedDoctorData
    ? selectedDoctorData.branchSchedule?.find(s => s.branchId === selectedBranch.id)
    : null
  const currentBranchSlots = currentBranchSchedule?.slots ?? []
  const currentBranchDays = [...new Set(currentBranchSlots.map(s => s.day))]

  // Check if the selected doctor is available on the selected date's weekday
  const selectedDayName = selectedDate
    ? dayNames[new Date(selectedDate + 'T12:00:00').getDay()]
    : ''
  const selectedDaySlots = selectedDayName
    ? currentBranchSlots.filter(s => s.day === selectedDayName)
    : []
  const doctorAvailableOnDate = selectedDoctorData && selectedDate
    ? currentBranchSlots.length === 0 || currentBranchDays.includes(selectedDayName)
    : true

  if (submitted && bookingData) {
    return (
      <>
        {/* ═══ Confirmation ═══ */}
        <section className="relative bg-bg-base overflow-hidden border-b border-violet-200 py-24 lg:py-36">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-500/8 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-2xl mx-auto px-6 text-center animate-fade-in-up">
            <div className="w-20 h-20 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">Appointment Booked!</h1>
            <p className="text-lg text-slate-500 mb-8">Your appointment has been scheduled successfully.</p>

            <div className="bg-bg-card rounded-2xl border border-violet-200 p-6 mb-8 text-left max-w-md mx-auto space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-500">Location</span>
                <span className="text-slate-900 font-medium flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {bookingData.branchName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Doctor</span>
                <span className="text-slate-900 font-medium">{bookingData.doctor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date</span>
                <span className="text-slate-900 font-medium">{bookingData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Time</span>
                <span className="text-slate-900 font-medium">{bookingData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Patient</span>
                <span className="text-slate-900 font-medium">{bookingData.name}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={reset}className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-xl font-semibold transition-all active:scale-[0.98]"
                >
                Book Another Appointment
              </button>
              <Link
                to="/"
                className="border-2 border-violet-300 hover:border-violet-400 text-slate-600 hover:text-slate-900 px-8 py-4 rounded-xl font-semibold transition-all active:scale-[0.98]"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>

        {/* Summary confirmation banner */}
        <section className="bg-bg-surface border-t border-violet-200 py-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-slate-500 mb-2">A confirmation email has been sent to <span className="text-violet-600">{bookingData.email}</span></p>
            <p className="text-slate-400 text-sm">Need to reschedule? Please call us at 9775996262</p>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <SEO
        title="Book an Appointment | Sonoscan Healthcare"
        description="Schedule your visit at Sonoscan Healthcare. Choose your preferred doctor, pick a convenient date and time, and book your appointment in minutes."
      />
      {/* ═══ Hero ═══ */}
      <section className="rounded-b-4xl relative overflow-hidden min-h-screen bg-[#0a0715] -mt-16 lg:-mt-28">
        {/* Background image with slide-in animation */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920&q=80"
            alt="Medical consultation"
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
          <div className="max-w-2xl">
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-2 text-sm text-white/60 mb-4 opacity-0 animate-fade-in-up"
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
              <span className="text-white/80" aria-current="page">Book Appointment</span>
            </nav>

            <div
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-medium mb-6 border border-white/20 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              Book Appointment
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1100ms', animationFillMode: 'forwards' }}
            >
              Schedule Your{' '}
              <span className="text-violet-300">Visit</span>
            </h1>
            <p
              className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1300ms', animationFillMode: 'forwards' }}
            >
              Choose your preferred doctor, date, and time. We'll confirm your appointment within 24 hours.
            </p>

            {/* Steps indicator */}
            <div className="opacity-0 animate-fade-in-up flex items-center gap-4 mt-10" style={{ animationDelay: '1500ms', animationFillMode: 'forwards' }}>
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      step >= s
                        ? 'bg-white text-violet-700'
                        : 'bg-white/10 text-white/60 border border-white/30'
                    }`}
                  >
                    {s}
                  </div>
                  <span className={`text-sm hidden sm:inline ${step >= s ? 'text-white' : 'text-white/50'}`}>
                    {s === 1 ? 'Doctor' : s === 2 ? 'Date & Time' : 'Details'}
                  </span>
                  {s < 3 && <div className={`w-8 h-0.5 ${step > s ? 'bg-white/60' : 'bg-white/20'}`} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <BrandWave variant="white" />
      </section>

      {/* ═══ Main Booking Section ═══ */}
      <section className="py-16 lg:py-24 bg-bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          {/* Step 1 — Choose Doctor */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">Select a Doctor</h2>
                  <p className="text-slate-500">
                    {branchDoctors.length > 0
                      ? `${branchDoctors.length} doctor${branchDoctors.length > 1 ? 's' : ''} available at ${selectedBranch.name}`
                      : 'No doctors available at this branch'
                    }
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-lg text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {selectedBranch.name}
                </div>
              </div>

              {branchDoctors.length === 0 ? (
                <div className="bg-bg-card rounded-2xl border border-dashed border-violet-200 p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No Doctors Available</h3>
                  <p className="text-slate-500 text-sm">Please select a different branch location to see available doctors.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {branchDoctors.map((doc, filteredIdx) => {
                    const actualIdx = getActualIndex(filteredIdx)
                    return (
                      <button
                        key={doc.name}
                        onClick={() => setSelectedDoctor(actualIdx)}
                        className={`text-left bg-bg-card rounded-xl p-5 border transition-all duration-200 ${
                          selectedDoctor === actualIdx
                            ? 'border-violet-500 bg-violet-50 shadow-lg shadow-violet-500/10'
                            : 'border-violet-200 hover:border-violet-300 hover:bg-violet-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                            selectedDoctor === actualIdx
                              ? 'bg-gradient-to-br from-violet-500 to-violet-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {doc.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-900 text-sm truncate">{doc.name}</p>
                            <p className="text-xs text-slate-400 truncate">
                              {doc.specialty}{doc.qualification ? ` · ${doc.qualification}` : ''}
                            </p>
                          </div>
                          {selectedDoctor === actualIdx && (
                            <svg className="w-5 h-5 text-violet-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => {
                            const scheduleEntry = doc.branchSchedule?.find(s => s.branchId === selectedBranch.id)
                            const isAvailable = scheduleEntry?.slots.some(slot => slot.day === day)
                            return (
                              <span
                                key={day}
                                className={`text-[10px] px-1.5 py-0.5 rounded ${
                                  isAvailable
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-slate-100 text-slate-400'
                                }`}
                              >
                                {day.slice(0, 2)}
                              </span>
                            )
                          })}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}

              <div className="flex justify-end mt-8">
                <button
                  onClick={() => selectedDoctor !== null && setStep(2)}
                  disabled={selectedDoctor === null}
                  className="bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold transition-all active:scale-[0.98]"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2 — Date & Time */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Pick a Date & Time</h2>
              <p className="text-slate-500 mb-8">Choose when you'd like to visit {selectedDoctorData?.name}.</p>

              {selectedDate && !doctorAvailableOnDate && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                  <div>
                    <p className="text-amber-700 font-medium text-sm">Availability Notice</p>
                    <p className="text-amber-600/70 text-sm mt-0.5">{selectedDoctorData?.name} is typically not available on {selectedDayName}s. Consider choosing a different date or selecting another doctor.</p>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                {/* Date picker */}
                <div>
                  <label htmlFor="appt-date" className="block text-sm font-medium text-slate-700 mb-3">
                    Select Date
                  </label>
                  <div className="relative">
                    <input
                      id="appt-date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime('') }}
                      min={getMinDate()}
                      max={getMaxDate()}
                      className="w-full px-4 py-3.5 rounded-xl bg-bg-card border border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all outline-none text-slate-900 appearance-none"
                    />
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-500 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                  </div>
                  {selectedDate && (
                    <p className="text-sm text-violet-600 mt-2">
                      {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  )}
                </div>

                {/* Time slots */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Select Time
                  </label>
                  {!selectedDate ? (
                    <div className="flex items-center justify-center h-[200px] bg-bg-card rounded-xl border border-dashed border-violet-200">
                      <p className="text-slate-400 text-sm">Pick a date first</p>
                    </div>
                  ) : currentBranchSlots.length === 0 ? (
                    // Doctor has no OPD schedule — fall back to generic slots
                    <div className="grid grid-cols-3 gap-2 max-h-[260px] overflow-y-auto pr-1">
                      {timeSlots.map((t) => {
                        // Filter morning slots on weekends
                        const dateObj = new Date(selectedDate + 'T12:00:00')
                        const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6
                        const isMorning = t.includes('AM')
                        if (isWeekend && isMorning) return null

                        return (
                          <button
                            key={t}
                            onClick={() => setSelectedTime(t)}
                            className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                              selectedTime === t
                                ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                                : 'bg-bg-card text-slate-700 border border-violet-200 hover:border-violet-300 hover:bg-violet-50/50'
                            }`}
                          >
                            {t}
                          </button>
                        )
                      })}
                    </div>
                  ) : selectedDaySlots.length > 0 ? (
                    // Doctor's real OPD consultation windows for this weekday
                    <div className="grid grid-cols-2 gap-2 max-h-[260px] overflow-y-auto pr-1">
                      {selectedDaySlots.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`py-2.5 px-3 rounded-xl text-sm font-semibold transition-all ${
                            selectedTime === slot.time
                              ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                              : 'bg-bg-card text-slate-700 border border-violet-200 hover:border-violet-300 hover:bg-violet-50/50'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[200px] bg-bg-card rounded-xl border border-dashed border-violet-200">
                      <p className="text-slate-400 text-sm">No OPD window on this day</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="border-2 border-violet-300 hover:border-violet-400 text-slate-600 hover:text-slate-900 px-8 py-4 rounded-xl font-semibold transition-all active:scale-[0.98]"
                >
                  Back
                </button>
                <button
                  onClick={() => selectedDate && selectedTime && setStep(3)}
                  disabled={!selectedDate || !selectedTime}
                  className="bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold transition-all active:scale-[0.98]"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Patient Details */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Details</h2>
              <p className="text-slate-500 mb-8">Please provide your contact information to confirm the appointment.</p>

              {/* Summary */}
              <div className="bg-bg-card rounded-2xl border border-violet-200 p-6 mb-8 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">Location:</span>
                  <span className="text-slate-900 ml-1 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {selectedBranch.name}
                  </span>
                </div>
                <div><span className="text-slate-400">Doctor:</span> <span className="text-slate-900 ml-1">{selectedDoctorData?.name}</span></div>
                <div><span className="text-slate-400">Date:</span> <span className="text-slate-900 ml-1">{selectedDate}</span></div>
                <div><span className="text-slate-400">Time:</span> <span className="text-slate-900 ml-1">{selectedTime}</span></div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label htmlFor="appt-name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="appt-name" type="text" required
                    value={form.name}
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
                  <label htmlFor="appt-email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="appt-email" type="email" required
                    value={form.email}
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
                  <label htmlFor="appt-phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="appt-phone" type="tel" required
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className={`w-full px-4 py-3.5 rounded-xl bg-bg-card border focus:ring-2 transition-all outline-none text-slate-900 placeholder-slate-400 ${
                      formErrors.phone
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-violet-200 focus:border-violet-500 focus:ring-violet-500/20'
                    }`}
                    placeholder="+1 (555) 000-0000"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                      </svg>
                      {formErrors.phone}
                    </p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="appt-notes" className="block text-sm font-medium text-slate-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="appt-notes" rows={3}
                    value={form.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-bg-card border border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all outline-none text-slate-900 placeholder-slate-400 resize-none"
                    placeholder="Any specific concerns or questions..."
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="border-2 border-violet-300 hover:border-violet-400 text-slate-600 hover:text-slate-900 px-8 py-4 rounded-xl font-semibold transition-all active:scale-[0.98]"
                >
                  Back
                </button>
                <button
                  onClick={handleBook}
                  disabled={!form.name || !form.email || !form.phone}
                  className="bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold transition-all active:scale-[0.98] inline-flex items-center gap-2"
                >
                  Confirm Booking
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
