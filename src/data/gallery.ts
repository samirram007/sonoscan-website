import type { GalleryImage, GalleryCategory, VirtualTour } from '../features/gallery/schema'

export const galleryCategories: GalleryCategory[] = [
  { id: 'all', label: 'All' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'equipment', label: 'Equipment' },
  { id: 'team', label: 'Our Team' },
  { id: 'patient-rooms', label: 'Patient Rooms' },
  { id: 'waiting-area', label: 'Waiting Area' },
]

export const galleryImages: GalleryImage[] = [
  { id: 'fac-1', src: '../images/blood2.JPG', alt: 'Blood Collection', category: 'facilities', title: 'Blood Collection', description: 'Our state-of-the-art Blood Collection facility.' },
  { id: 'fac-2', src: '../images/bl1.JPG', alt: 'Blood Collection', category: 'facilities', title: 'Blood Collection', description: 'Our state-of-the-art Blood Collection facility.' },
  { id: 'fac-3', src: '../images/dr1.JPG', alt: 'Direct Radiography', category: 'facilities', title: 'Console of DR-Xray', description: 'Faster Imaging. Accurate Diagnosis. Better Care.' },
  { id: 'fac-4', src: '../images/dr2.JPG', alt: 'Direct Radiography', category: 'facilities', title: 'DR-Xray', description: 'Faster Imaging. Accurate Diagnosis. Better Care.' },
  { id: 'fac-5', src: '../images/dr1.JPG', alt: 'Direct Radiography', category: 'facilities', title: 'Console of DR - Xray', description: 'Faster Imaging. Accurate Diagnosis. Better Care.' },
  { id: 'eq-1', src: '../images/dr2.JPG', alt: 'Direct Radiography', category: 'equipment', title: 'MRI Scanner', description: 'Advanced 3T MRI scanner providing high-resolution diagnostic imaging.' },
  { id: 'eq-2', src: '../images/xray.jpeg', alt: 'X-ray machine in examination room', category: 'equipment', title: 'Digital X-Ray System', description: 'Low-radiation digital X-ray technology for safe and accurate imaging.' },
  { id: 'eq-3', src: '../images/examination.jpeg', alt: 'Modern medical examination chair', category: 'equipment', title: 'Examination Suite', description: 'Fully equipped examination rooms with the latest medical technology.' },
  { id: 'eq-4', src: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80', alt: 'Surgical equipment in operating room', category: 'equipment', title: 'Operating Theatre', description: 'State-of-the-art surgical suite with advanced monitoring systems.' },
  { id: 'team-1', src: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80', alt: 'Medical team in consultation', category: 'team', title: 'Our Medical Team', description: 'Dedicated healthcare professionals committed to your well-being.' },
  { id: 'team-2', src: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80', alt: 'Doctor with patient in consultation', category: 'team', title: 'Patient Consultation', description: 'Our doctors take time to listen and understand your health concerns.' },
  { id: 'team-3', src: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80', alt: 'Nurse checking patient vitals', category: 'team', title: 'Compassionate Nursing Care', description: 'Our nursing staff provides round-the-clock care and support.' },
  { id: 'pr-1', src: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80', alt: 'Comfortable patient room', category: 'patient-rooms', title: 'Private Patient Room', description: 'Comfortable private rooms designed for rest and recovery.' },
  { id: 'pr-2', src: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80', alt: 'Dental examination room', category: 'patient-rooms', title: 'Dental Suite', description: 'Modern dental examination room with panoramic imaging.' },
  { id: 'pr-3', src: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&q=80', alt: 'Eye examination room', category: 'patient-rooms', title: 'Optometry Room', description: 'Specialized vision testing and eye examination facilities.' },
  { id: 'wa-1', src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80', alt: 'Comfortable waiting area', category: 'waiting-area', title: 'Main Waiting Lounge', description: 'Spacious and comfortable waiting area with complimentary refreshments.' },
  { id: 'wa-2', src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80', alt: 'Children play area in waiting room', category: 'waiting-area', title: "Children's Play Area", description: 'A safe and fun space for children while they wait.' },
  { id: 'wa-3', src: 'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?w=800&q=80', alt: 'Wellness and pharmacy area', category: 'waiting-area', title: 'In-House Pharmacy', description: 'Convenient on-site pharmacy for quick prescription fulfillment.' },
]

export const virtualTour: VirtualTour = {
  title: 'Take a Virtual Tour of Sonoscan Healthcare',
  description: 'Get a feel for our facility before your visit. This virtual walkthrough highlights our state-of-the-art equipment, comfortable patient rooms, and welcoming common areas.',
  videoSrc: 'https://www.youtube.com/embed/4LrQ8V6offk',
  thumbnailSrc: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1280&q=80',
}
