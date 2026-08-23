import type { Benefit, Testimonial, Stat, CoreValue } from '../features/home/schema'

export const benefits: Benefit[] = [
  { title: 'Expert Physicians', description: 'Board-certified doctors with years of experience in their respective fields.' },
  { title: 'Modern Technology', description: 'State-of-the-art medical equipment and cutting-edge treatment methods.' },
  { title: 'Personalized Care', description: 'Tailored treatment plans designed specifically for your unique health needs.' },
  { title: '24/7 Support', description: 'Round-the-clock medical support and emergency services whenever you need them.' },
]

export const testimonials: Testimonial[] = [
  { name: 'Sarah Johnson', role: 'Patient', text: 'The care I received at Sonoscan Healthcare was exceptional. The doctors took time to explain everything and made me feel truly valued as a patient.', rating: 5 },
  { name: 'Michael Chen', role: 'Patient', text: 'I have been coming to Sonoscan Healthcare for years. The consistency in quality of care and the friendly staff keep me coming back.', rating: 5 },
  { name: 'Emily Rodriguez', role: 'Patient', text: 'After visiting several clinics, I finally found Sonoscan Healthcare. Their holistic approach to healthcare made all the difference in my recovery.', rating: 5 },
]

export const stats: Stat[] = [
  { value: '25+', label: 'Years of Experience' },
  { value: '50K+', label: 'Happy Patients' },
  { value: '150+', label: 'Expert Doctors' },
  { value: '98%', label: 'Satisfaction Rate' },
]

export const coreValues: CoreValue[] = [
  {
    title: 'Compassion',
    description: 'We treat every patient with empathy, dignity, and genuine care — putting their emotional well-being alongside their physical health.',
    iconName: 'heart',
    color: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50 text-rose-600',
    border: 'border-rose-200',
    hover: 'hover:border-rose-300 hover:shadow-rose-200/30',
  },
  {
    title: 'Integrity',
    description: 'We uphold the highest ethical standards in every interaction — transparent pricing, honest consultations, and unwavering accountability.',
    iconName: 'shield',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50 text-emerald-600',
    border: 'border-emerald-200',
    hover: 'hover:border-emerald-300 hover:shadow-emerald-200/30',
  },
  {
    title: 'Excellence',
    description: 'We pursue the highest quality in everything we do — from advanced diagnostics to compassionate follow-up care.',
    iconName: 'star',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50 text-amber-600',
    border: 'border-amber-200',
    hover: 'hover:border-amber-300 hover:shadow-amber-200/30',
  },
  {
    title: 'Innovation',
    description: 'We embrace cutting-edge medical technology and continuously evolve our practices to deliver the most advanced care.',
    iconName: 'lightbulb',
    color: 'from-sky-500 to-cyan-600',
    bg: 'bg-sky-50 text-sky-600',
    border: 'border-sky-200',
    hover: 'hover:border-sky-300 hover:shadow-sky-200/30',
  },
  {
    title: 'Patient-Centered',
    description: 'Every decision we make starts with our patients. Your needs, preferences, and values guide every aspect of your care journey.',
    iconName: 'people',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50 text-violet-600',
    border: 'border-violet-200',
    hover: 'hover:border-violet-300 hover:shadow-violet-200/30',
  },
]
