export interface Branch {
  id: string
  name: string
  address: string
  phone: string
  whatsapp: string
  email: string
  hours: string
  image: string
  description: string
  services: string[]
  doctorCount: number
  lat: number
  lng: number
}

/**
 * Extracts the primary (first) phone number from a branch's `phone`/`whatsapp`
 * field, which may contain multiple numbers separated by " / ".
 * Example: '9775996262 / 9775996363' → '9775996262'
 */
export function primaryNumber(value: string): string {
  return value.split('/')[0].replace(/[^0-9]/g, '').trim()
}

export const branches: Branch[] = [
  {
    id: 'kolkata',
    name: 'Kolkata',
    address: '44, S.M. Avenue, Kolkata - 700014',
    phone: '9775996262 / 9775996363',
    whatsapp: '9775996262 / 9775996363',
    email: 'info@sonoscanhealthcare.com',
    hours: 'Everyday: 7:00 AM – 9:00 PM',
    image: '../images/kolkata.png',
    description:
      'Our flagship Kolkata centre at 44 S.M. Avenue offers comprehensive diagnostic services in the heart of the city. With state-of-the-art equipment including advanced MRI, CT scan, digital X-ray, ultrasound, and a fully equipped pathology lab, we provide accurate and timely results. Our team of experienced radiologists and pathologists ensures the highest standard of care.',
    services: ['Pathology', 'Radiology', 'Cardiology', 'Neurology', 'ENT', 'Gastroenterology', 'Urology', 'Dental', 'Skin', 'Others'],
    doctorCount: 44,
    lat: 22.5726,
    lng: 88.3639,
  },
  {
    id: 'malda',
    name: 'Malda',
    address: 'Makdumpur, Malda, West Bengal',
    phone: '9775992733 / 9775992744',
    whatsapp: '9775992733 / 9775992744',
    email: 'info@sonoscanhealthcare.com',
    hours: 'Everyday: 7:00 AM – 9:00 PM',
    image: '../images/malda.png',
    description:
      'Sonoscan Healthcare in Malda (Makhdumpur) brings premium diagnostic services to North Bengal. Our facility is equipped with advanced imaging technology including CT scan, digital X-ray, ultrasound, and a full-service pathology laboratory. We are staffed by dedicated medical professionals committed to serving the local community with accuracy and compassion.',
    services: ['Pathology', 'Radiology', 'Cardiology', 'Neurology', 'ENT', 'Gastroenterology', 'Urology', 'Dental', 'Others'],
    doctorCount: 17,
    lat: 25.0100,
    lng: 88.1400,
  },
  {
    id: 'balurghat',
    name: 'Balurghat',
    address: 'Thana More, Balurghat, Dakshin Dinajpur, West Bengal 733101',
    phone: '9775990500 / 9775990600',
    whatsapp: '9775990500 / 9775990600',
    email: 'info@sonoscanhealthcare.com',
    hours: 'Everyday: 7:00 AM – 9:00 PM',
    image: '../images/blg.png',
    description:
      'Our Balurghat centre at Thana More extends quality diagnostic services to the Dakshin Dinajpur region. This well-equipped facility provides digital X-ray, ultrasound, and a wide range of pathology tests with a focus on accurate diagnosis and community health. Our team takes pride in delivering compassionate, accessible healthcare to every patient.',
    services: ['Pathology', 'Radiology', 'Cardiology', 'Neurology', 'ENT', 'Gastroenterology', 'Urology', 'Others'],
    doctorCount: 5,
    lat: 25.2200,
    lng: 88.7700,
  },
  {
    id: 'gangarampur',
    name: 'Gangarampur',
    address: '40, Gangarampur - Tapan Main Road, P.W.D Para, Gangarampur, Dakshin Dinajpur - 733124',
    phone: '9775990800 / 9775990804',
    whatsapp: '9775990800 / 9775990804',
    email: 'info@sonoscanhealthcare.com',
    hours: 'Everyday: 7:00 AM – 9:00 PM',
    image: '../images/ganga.png',
    description:
      'Serving the Gangarampur community from our centre on Gangarampur-Tapan Main Road, we offer essential diagnostic services including digital X-ray, ultrasound, and pathology testing. Our clinic provides quality healthcare in a warm and professional setting, ensuring that accurate diagnostic services reach every corner of Dakshin Dinajpur.',
    services: ['Pathology', 'Radiology', 'Cardiology', 'Neurology', 'ENT', 'Gastroenterology', 'Urology', 'Dental', 'Eye', 'Others'],
    doctorCount: 5,
    lat: 25.4000,
    lng: 88.5200,
  },
]
