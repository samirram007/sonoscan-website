import type { DepartmentContact, FAQ, OtherUnit } from '../features/contact/schema'

export const departments: DepartmentContact[] = [
  { name: 'Pathology & Lab Diagnostics', phone: '9775996262', email: 'info@sonoscanhealthcare.com' },
  { name: 'Radiology & Imaging', phone: '9775996363', email: 'info@sonoscanhealthcare.com' },
  { name: 'Multi-Specialty OPD', phone: '9775996262', email: 'info@sonoscanhealthcare.com' },
  { name: 'Health Check Packages', phone: '9775996262', email: 'info@sonoscanhealthcare.com' },
]

export const faqs: FAQ[] = [
  { q: 'What are your operating hours?', a: 'We are open Monday through Saturday. Hours vary by branch — our Kolkata centre operates from 8:00 AM to 8:00 PM, while other branches have slightly adjusted timings. Please check the specific branch page for details.' },
  { q: 'Do I need an appointment for diagnostic tests?', a: 'While walk-ins are welcome for most tests, we recommend booking an appointment for radiology services (MRI, CT scan, USG) to ensure minimal wait times. For pathology tests, samples are accepted throughout the day.' },
  { q: 'How can I get my test reports?', a: 'Test reports are typically available within 24-48 hours. You can download your reports directly from our patient portal, or request a physical copy at the centre. We also offer WhatsApp delivery of reports for your convenience.' },
  { q: 'What should I bring for my first visit?', a: 'Please bring a valid government ID, any previous medical records or prescription from your doctor, and a list of current medications. For fasting tests, please follow the preparation instructions provided at the time of booking.' },
  { q: 'Do you offer home sample collection?', a: 'Yes, we offer home sample collection for pathology tests across all our branches. Please contact us to schedule a convenient time slot for sample collection at your doorstep.' },
]

export const parkClinic: OtherUnit = {
  name: 'Park Clinic (Park Medical Research & Welfare Society)',
  description: 'Technically Supported by SONOSCAN',
  address: '4, Gorky Terrace, Kolkata - 700017',
  phone: '9775992022 / 9775992024',
  whatsapp: '9775991355',
  email: 'info@parkclinickolkata.com / info@parksonoscanclinic.com',
  website: 'www.parkclinickolkata.in / www.parksonoscanclinic.com',
  lat: 22.5410,
  lng: 88.3530,
}

export const otherUnits: OtherUnit[] = [
  {
    name: 'C.T. Scan Unit',
    address: 'Malda Medical College & Hospital, Malda',
    phone: '9775990400',
  },
  {
    name: 'Sonoscan Healthcare Pvt. Ltd.',
    address: 'Laxmi Market, Buniadpur, Dakshin Dinajpur',
    phone: '9775990900',
  },
  {
    name: 'Sonoscan Healthcare Pvt. Ltd.',
    address: 'Hospital More, Balurghat',
    phone: '9775996998',
  },
  {
    name: 'Sonoscan Healthcare Pvt. Ltd.',
    address: 'College Road, Chanchal, Malda',
    phone: '9775991393',
  },
  {
    name: 'Sonoscan Healthcare Pvt. Ltd.',
    address: 'Opposite Thana Gate, Kaliachak',
    phone: '9775994778',
  },
  {
    name: 'Sonoscan Healthcare Pvt. Ltd.',
    address: 'Town Club Lane, Ukilpara, P.O. & P.S. - Raiganj, Dist. - Uttar Dinajpur, Pin - 733134',
    phone: '9775991602',
  },
]
