import type { Doctor, TeamMember, AppointmentDoctor } from '../features/doctors/schema'

// ──────────────────────────────────────────────
// All doctors keyed by slug
// ──────────────────────────────────────────────
const allDoctors: Doctor[] = [
  // ═══════════════════════════════════════════
  // DEPARTMENT OF PATHOLOGY
  // ═══════════════════════════════════════════
  {
    name: 'Dr. Soma Ray',
    initials: 'SR',
    role: 'Consultant Pathologist',
    specialty: 'Pathology',
    slug: 'soma-ray',
    branchIds: ['kolkata', 'malda'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
      { branchId: 'malda', days: ['Sat'] },
    ],
    bio: 'Dr. Soma Ray is a highly experienced pathologist with expertise in clinical pathology and diagnostic cytology. With qualifications in both child health (D.C.H.) and clinical pathology (D.C.P.), she brings a unique perspective to laboratory medicine at Sonoscan Healthcare.',
    education: [
      { degree: 'D.C.P. (Clinical Pathology)', school: 'University of Calcutta', year: '2005' },
      { degree: 'D.C.H. (Child Health)', school: 'University of Calcutta', year: '2003' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2001' },
    ],
    certifications: ['Certified in Clinical Pathology', 'Member, Indian Association of Pathologists'],
    specialties: ['Clinical Pathology', 'Diagnostic Cytology', 'Hematology'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
    funFact: 'Dr. Ray has been an integral part of Sonoscan since its early days and has helped shape the pathology department into one of the most trusted in the region.',
    reviews: [
      { name: 'Priya Sharma', rating: 5, date: '2025-11-15', comment: 'Dr. Ray was very thorough in explaining my test results. Highly recommended.' },
      { name: 'Ananya Das', rating: 5, date: '2025-09-02', comment: 'Very professional and caring. The lab reports were delivered on time.' },
    ],
  },
  {
    name: 'Dr. Debasis Banerjee',
    initials: 'DB',
    role: 'Senior Consultant Pathologist',
    specialty: 'Pathology',
    slug: 'debasis-banerjee',
    branchIds: ['kolkata', 'malda', 'balurghat'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Thu', 'Fri'] },
      { branchId: 'malda', days: ['Wed'] },
      { branchId: 'balurghat', days: ['Sat'] },
    ],
    bio: 'Dr. Debasis Banerjee is a senior pathologist at Sonoscan Healthcare with extensive experience in histopathology and clinical laboratory management. His expertise in diagnostic pathology has made him a trusted name in the field.',
    education: [
      { degree: 'M.D. (Pathology)', school: 'University of Calcutta', year: '2006' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2002' },
    ],
    certifications: ['Board Certified — Pathology', 'Member, Indian Association of Pathologists & Microbiologists'],
    specialties: ['Histopathology', 'Clinical Pathology', 'Laboratory Medicine'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
    funFact: 'Dr. Banerjee is known for his meticulous approach to diagnosis and has mentored numerous young pathologists over his career.',
    reviews: [
      { name: 'Rahul Mukherjee', rating: 5, date: '2025-10-20', comment: 'Dr. Banerjee is an excellent pathologist. He took time to explain everything clearly.' },
      { name: 'Sneha Ghosh', rating: 4, date: '2025-08-14', comment: 'Very knowledgeable doctor. The diagnostic accuracy is remarkable.' },
    ],
  },
  {
    name: 'Dr. Susruta Sen',
    initials: 'SS',
    role: 'Consultant Pathologist',
    specialty: 'Pathology',
    slug: 'susruta-sen',
    branchIds: ['kolkata', 'malda', 'gangarampur'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
      { branchId: 'malda', days: ['Sat'] },
      { branchId: 'gangarampur', days: ['Fri'] },
    ],
    bio: 'Dr. Susruta Sen is a dedicated pathologist with dual qualifications in pathology (M.D., D.N.B.). His expertise spans across histopathology, cytology, and hematological diagnostics, contributing to Sonoscan\'s reputation for accurate laboratory results.',
    education: [
      { degree: 'D.N.B. (Pathology)', school: 'National Board of Examinations', year: '2008' },
      { degree: 'M.D. (Pathology)', school: 'University of Calcutta', year: '2006' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2003' },
    ],
    certifications: ['Diplomate of National Board — Pathology', 'Member, Indian Medical Association'],
    specialties: ['Histopathology', 'Cytopathology', 'Hematology'],
    languages: ['English', 'Bengali'],
    publications: [],
    reviews: [
      { name: 'Arjun Nandy', rating: 5, date: '2025-12-01', comment: 'Dr. Sen provided excellent diagnostic services. The lab is very well-equipped.' },
      { name: 'Mita Roy', rating: 4, date: '2025-10-05', comment: 'Professional and efficient. Would visit again.' },
    ],
  },
  {
    name: 'Dr. Subhranshu Mandal',
    initials: 'SM',
    role: 'Consultant Pathologist',
    specialty: 'Pathology',
    slug: 'subhranshu-mandal',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    ],
    education: [
      { degree: 'M.D. (Pathology)', school: 'University of Calcutta', year: '2007' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2003' },
    ],
    certifications: ['Member, Indian Association of Pathologists'],
    specialties: ['Clinical Pathology', 'Microbiology'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
  },
  {
    name: 'Dr. Souvik Dutta',
    initials: 'SD',
    role: 'Consultant Pathologist',
    specialty: 'Pathology',
    slug: 'souvik-dutta',
    branchIds: ['kolkata', 'malda'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu'] },
      { branchId: 'malda', days: ['Fri', 'Sat'] },
    ],
    education: [
      { degree: 'M.D. (Pathology)', school: 'University of Calcutta', year: '2009' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2005' },
    ],
    certifications: ['Member, Indian Association of Pathologists'],
    specialties: ['Histopathology', 'Immunohistochemistry'],
    languages: ['English', 'Bengali'],
    publications: [],
  },
  {
    name: 'Dr. Molay Roy',
    initials: 'MR',
    role: 'Consultant Pathologist',
    specialty: 'Pathology',
    slug: 'molay-roy',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    ],
    education: [
      { degree: 'M.D. (Pathology)', school: 'University of Calcutta', year: '2010' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2005' },
    ],
    certifications: ['Member, Indian Association of Pathologists'],
    specialties: ['Clinical Pathology', 'Hematology'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
  },
  {
    name: 'Dr. Rituparna Haldar',
    initials: 'RH',
    role: 'Consultant Pathologist',
    specialty: 'Pathology',
    slug: 'rituparna-haldar',
    branchIds: ['kolkata', 'balurghat'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu'] },
      { branchId: 'balurghat', days: ['Fri', 'Sat'] },
    ],
    education: [
      { degree: 'M.D. (Pathology)', school: 'University of Calcutta', year: '2011' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2006' },
    ],
    certifications: ['Member, Indian Association of Pathologists'],
    specialties: ['Cytopathology', 'Clinical Pathology'],
    languages: ['English', 'Bengali'],
    publications: [],
  },
  {
    name: 'Dr. Lahari Banik',
    initials: 'LB',
    role: 'Consultant Pathologist',
    specialty: 'Pathology',
    slug: 'lahari-banik',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    ],
    education: [
      { degree: 'M.D. (Pathology)', school: 'University of Calcutta', year: '2012' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2007' },
    ],
    certifications: ['Member, Indian Association of Pathologists'],
    specialties: ['Histopathology', 'Clinical Pathology'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
  },

  // ═══════════════════════════════════════════
  // DEPARTMENT OF RADIOLOGY & IMAGING
  // ═══════════════════════════════════════════
  {
    name: 'Dr. Sanjukta Sarkar',
    initials: 'SS',
    role: 'Senior Consultant Radiologist',
    specialty: 'Radiology',
    slug: 'sanjukta-sarkar',
    branchIds: ['kolkata', 'malda'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
      { branchId: 'malda', days: ['Sat'] },
    ],
    bio: 'Dr. Sanjukta Sarkar is a senior radiologist specializing in advanced diagnostic imaging including MRI, CT, and ultrasound. With years of experience at Sonoscan, she is instrumental in providing accurate radiological diagnoses.',
    education: [
      { degree: 'M.D. (Radiology)', school: 'University of Calcutta', year: '2006' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2002' },
    ],
    certifications: ['Board Certified — Radiology', 'Member, Indian Radiological & Imaging Association'],
    specialties: ['MRI Interpretation', 'CT Imaging', 'Ultrasound', 'Mammography'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
    funFact: 'Dr. Sarkar has been with Sonoscan since the introduction of 3 Tesla Silent MRI technology in Kolkata.',
    reviews: [
      { name: 'Tanmay Bose', rating: 5, date: '2025-11-28', comment: 'Dr. Sarkar is a brilliant radiologist. Her interpretation of my MRI was spot-on.' },
      { name: 'Poulami Sen', rating: 5, date: '2025-09-15', comment: 'Very patient and explained the imaging results in simple terms.' },
    ],
  },
  {
    name: 'Dr. Pulastya Sanyal',
    initials: 'PS',
    role: 'Consultant Radiologist',
    specialty: 'Radiology',
    slug: 'pulastya-sanyal',
    branchIds: ['kolkata', 'malda'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Thu', 'Fri'] },
      { branchId: 'malda', days: ['Wed', 'Sat'] },
    ],
    education: [
      { degree: 'M.D. (Radiology)', school: 'University of Calcutta', year: '2007' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2003' },
    ],
    certifications: ['Member, Indian Radiological & Imaging Association'],
    specialties: ['CT Imaging', 'Ultrasound', 'Doppler Studies'],
    languages: ['English', 'Bengali'],
    publications: [],
  },
  {
    name: 'Dr. M. Chaudhuri',
    initials: 'MC',
    role: 'Consultant Radiologist',
    specialty: 'Radiology',
    slug: 'm-chaudhuri',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    ],
    education: [
      { degree: 'M.D. (Radiology)', school: 'University of Calcutta', year: '2008' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2004' },
    ],
    certifications: ['Member, Indian Radiological & Imaging Association'],
    specialties: ['MRI Imaging', 'Neuroradiology'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
  },
  {
    name: 'Dr. A. Indu Ghosh',
    initials: 'AG',
    role: 'Consultant Radiologist',
    specialty: 'Radiology',
    slug: 'a-indu-ghosh',
    branchIds: ['kolkata', 'balurghat'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu'] },
      { branchId: 'balurghat', days: ['Fri', 'Sat'] },
    ],
    education: [
      { degree: 'M.D. (Radiology)', school: 'University of Calcutta', year: '2009' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2005' },
    ],
    certifications: ['Member, Indian Radiological & Imaging Association'],
    specialties: ['Ultrasound', 'Mammography', 'Women\'s Imaging'],
    languages: ['English', 'Bengali'],
    publications: [],
  },
  {
    name: 'Dr. A. Ganeriwala',
    initials: 'AG',
    role: 'Consultant Radiologist',
    specialty: 'Radiology',
    slug: 'a-ganeriwala',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    ],
    education: [
      { degree: 'D.N.B. (Radiology)', school: 'National Board of Examinations', year: '2008' },
      { degree: 'M.D. (Radiology)', school: 'University of Calcutta', year: '2008' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2004' },
    ],
    certifications: ['Diplomate of National Board — Radiology', 'Member, Indian Radiological & Imaging Association'],
    specialties: ['CT Imaging', 'Interventional Radiology'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
  },
  {
    name: 'Dr. Suman Saraogi',
    initials: 'SS',
    role: 'Consultant Radiologist',
    specialty: 'Radiology',
    slug: 'suman-saraogi',
    branchIds: ['kolkata', 'malda', 'gangarampur'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed'] },
      { branchId: 'malda', days: ['Thu', 'Fri', 'Sat'] },
      { branchId: 'gangarampur', days: ['Tue'] },
    ],
    education: [
      { degree: 'M.D. (Radiology)', school: 'University of Calcutta', year: '2010' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2005' },
    ],
    certifications: ['Member, Indian Radiological & Imaging Association'],
    specialties: ['MRI Imaging', 'Musculoskeletal Radiology'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
  },
  {
    name: 'Dr. A. Banerjee',
    initials: 'AB',
    role: 'Consultant Radiologist',
    specialty: 'Radiology',
    slug: 'a-banerjee',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    ],
    education: [
      { degree: 'M.D. (Radiology)', school: 'University of Calcutta', year: '2009' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2005' },
    ],
    certifications: ['Member, Indian Radiological & Imaging Association'],
    specialties: ['CT Imaging', 'General Radiology'],
    languages: ['English', 'Bengali'],
    publications: [],
  },
  {
    name: 'Dr. Saba Faiz',
    initials: 'SF',
    role: 'Consultant Radiologist',
    specialty: 'Radiology',
    slug: 'saba-faiz',
    branchIds: ['kolkata', 'malda'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu'] },
      { branchId: 'malda', days: ['Fri'] },
    ],
    education: [
      { degree: 'M.D. (Radiology)', school: 'University of Calcutta', year: '2011' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2006' },
    ],
    certifications: ['Member, Indian Radiological & Imaging Association'],
    specialties: ['Ultrasound', 'Pediatric Radiology'],
    languages: ['English', 'Bengali', 'Urdu', 'Hindi'],
    publications: [],
  },
  {
    name: 'Dr. Suparna Sahu',
    initials: 'SS',
    role: 'Consultant Radiologist',
    specialty: 'Radiology',
    slug: 'suparna-sahu',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    ],
    education: [
      { degree: 'M.D. (Radiology)', school: 'University of Calcutta', year: '2012' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2007' },
    ],
    certifications: ['Member, Indian Radiological & Imaging Association'],
    specialties: ['MRI Imaging', 'Abdominal Imaging'],
    languages: ['English', 'Bengali'],
    publications: [],
  },
  {
    name: 'Dr. Amrita Ganguly',
    initials: 'AG',
    role: 'Consultant Radiologist',
    specialty: 'Radiology',
    slug: 'amrita-ganguly',
    branchIds: ['kolkata', 'balurghat'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Thu', 'Fri'] },
      { branchId: 'balurghat', days: ['Wed', 'Sat'] },
    ],
    education: [
      { degree: 'M.D. (Radiology)', school: 'University of Calcutta', year: '2012' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2007' },
    ],
    certifications: ['Member, Indian Radiological & Imaging Association'],
    specialties: ['Ultrasound', 'Doppler Studies', 'Obstetric Imaging'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
  },
  {
    name: 'Dr. Debraj Saha',
    initials: 'DS',
    role: 'Consultant Radiologist',
    specialty: 'Radiology',
    slug: 'debraj-saha',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    ],
    education: [
      { degree: 'M.D. (Radiology)', school: 'University of Calcutta', year: '2013' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2008' },
    ],
    certifications: ['Member, Indian Radiological & Imaging Association'],
    specialties: ['CT Imaging', 'Cardiac Imaging'],
    languages: ['English', 'Bengali'],
    publications: [],
  },
  {
    name: 'Dr. Devpriya Pradhan',
    initials: 'DP',
    role: 'Consultant Radiologist',
    specialty: 'Radiology',
    slug: 'devpriya-pradhan',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    ],
    education: [
      { degree: 'M.D. (Radiology)', school: 'University of Calcutta', year: '2013' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2008' },
    ],
    certifications: ['Member, Indian Radiological & Imaging Association'],
    specialties: ['MRI Imaging', 'Neuroradiology'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
  },
  {
    name: 'Dr. Sayantani Ghosh',
    initials: 'SG',
    role: 'Consultant Radiologist',
    specialty: 'Radiology',
    slug: 'sayantani-ghosh',
    branchIds: ['kolkata', 'malda'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Wed', 'Thu', 'Fri'] },
      { branchId: 'malda', days: ['Tue', 'Sat'] },
    ],
    education: [
      { degree: 'M.D. (Radiology)', school: 'University of Calcutta', year: '2014' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2009' },
    ],
    certifications: ['Member, Indian Radiological & Imaging Association'],
    specialties: ['Ultrasound', 'Pediatric Radiology'],
    languages: ['English', 'Bengali'],
    publications: [],
  },
  {
    name: 'Dr. Sankhadeep Saha',
    initials: 'SS',
    role: 'Consultant Radiologist',
    specialty: 'Radiology',
    slug: 'sankhadeep-saha',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    ],
    education: [
      { degree: 'M.D. (Radiology)', school: 'University of Calcutta', year: '2014' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2009' },
    ],
    certifications: ['Member, Indian Radiological & Imaging Association'],
    specialties: ['CT Imaging', 'Musculoskeletal Radiology'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
  },

  // ═══════════════════════════════════════════
  // DEPARTMENT OF CARDIOLOGY
  // ═══════════════════════════════════════════
  {
    name: 'Dr. Malay Acharya',
    initials: 'MA',
    role: 'Senior Consultant Cardiologist',
    specialty: 'Cardiology',
    slug: 'malay-acharya',
    branchIds: ['kolkata', 'malda'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Thu', 'Fri'] },
      { branchId: 'malda', days: ['Wed'] },
    ],
    bio: 'Dr. Malay Acharya is a senior cardiologist with extensive experience in non-invasive and interventional cardiology. His expertise in cardiac diagnostics and management of cardiovascular diseases makes him a trusted specialist at Sonoscan.',
    education: [
      { degree: 'D.M. (Cardiology)', school: 'University of Calcutta', year: '2007' },
      { degree: 'M.D. (General Medicine)', school: 'University of Calcutta', year: '2004' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2000' },
    ],
    certifications: ['Board Certified — Cardiology', 'Member, Cardiological Society of India'],
    specialties: ['Interventional Cardiology', 'Echocardiography', 'Cardiac Rehabilitation'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
    funFact: 'Dr. Acharya has performed thousands of cardiac consultations and is known for his compassionate approach to patient care.',
    reviews: [
      { name: 'Subrata Das', rating: 5, date: '2025-12-10', comment: 'Dr. Acharya is a lifesaver! His cardiac care is exceptional. Very grateful for his treatment.' },
      { name: 'Rina Pal', rating: 5, date: '2025-11-05', comment: 'Best cardiologist in Kolkata. He diagnosed my condition accurately when others couldn\'t.' },
      { name: 'Anil Gupta', rating: 4, date: '2025-09-20', comment: 'Very experienced cardiologist. The echo test was done professionally.' },
    ],
  },
  {
    name: 'Dr. Santanu De',
    initials: 'SD',
    role: 'Consultant Cardiologist',
    specialty: 'Cardiology',
    slug: 'santanu-de',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    ],
    education: [
      { degree: 'D.M. (Cardiology)', school: 'University of Calcutta', year: '2008' },
      { degree: 'M.D. (General Medicine)', school: 'University of Calcutta', year: '2005' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2001' },
    ],
    certifications: ['Member, Cardiological Society of India'],
    specialties: ['Non-invasive Cardiology', 'Echocardiography', 'Stress Testing'],
    languages: ['English', 'Bengali'],
    publications: [],
  },
  {
    name: 'Dr. Subhra Aditya',
    initials: 'SA',
    role: 'Consultant Cardiologist',
    specialty: 'Cardiology',
    slug: 'subhra-aditya',
    branchIds: ['kolkata', 'malda'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed'] },
      { branchId: 'malda', days: ['Thu', 'Fri', 'Sat'] },
    ],
    education: [
      { degree: 'D.M. (Cardiology)', school: 'University of Calcutta', year: '2009' },
      { degree: 'M.D. (General Medicine)', school: 'University of Calcutta', year: '2006' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2002' },
    ],
    certifications: ['Member, Cardiological Society of India'],
    specialties: ['Preventive Cardiology', 'Heart Failure Management', 'Echocardiography'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
  },
  {
    name: 'Dr. Biswarup Sarkar',
    initials: 'BS',
    role: 'Consultant Cardiologist',
    specialty: 'Cardiology',
    slug: 'biswarup-sarkar',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    ],
    education: [
      { degree: 'D.M. (Cardiology)', school: 'University of Calcutta', year: '2010' },
      { degree: 'M.D. (General Medicine)', school: 'University of Calcutta', year: '2006' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2002' },
    ],
    certifications: ['Member, Cardiological Society of India'],
    specialties: ['Interventional Cardiology', 'Coronary Angiography'],
    languages: ['English', 'Bengali'],
    publications: [],
  },
  {
    name: 'Dr. Lina Mukhopadhyay',
    initials: 'LM',
    role: 'Consultant Cardiologist',
    specialty: 'Cardiology',
    slug: 'lina-mukhopadhyay',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    ],
    education: [
      { degree: 'D.M. (Cardiology)', school: 'University of Calcutta', year: '2011' },
      { degree: 'M.D. (General Medicine)', school: 'University of Calcutta', year: '2007' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2003' },
    ],
    certifications: ['Member, Cardiological Society of India'],
    specialties: ['Women\'s Cardiac Health', 'Echocardiography', 'Arrhythmia Management'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
  },
  {
    name: 'Dr. Soumyojit Saha',
    initials: 'SS',
    role: 'Consultant Cardiologist',
    specialty: 'Cardiology',
    slug: 'soumyojit-saha',
    branchIds: ['kolkata', 'malda'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Wed', 'Fri'] },
      { branchId: 'malda', days: ['Tue', 'Thu', 'Sat'] },
    ],
    education: [
      { degree: 'D.M. (Cardiology)', school: 'University of Calcutta', year: '2012' },
      { degree: 'M.D. (General Medicine)', school: 'University of Calcutta', year: '2008' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2004' },
    ],
    certifications: ['Member, Cardiological Society of India'],
    specialties: ['Preventive Cardiology', 'Cardiac Imaging', 'TMT Interpretation'],
    languages: ['English', 'Bengali'],
    publications: [],
  },
  {
    name: 'Dr. Debabrata Sarkar',
    initials: 'DS',
    role: 'Consultant Cardiologist',
    specialty: 'Cardiology',
    slug: 'debabrata-sarkar',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Thu', 'Fri', 'Sat'] },
    ],
    education: [
      { degree: 'D.M. (Cardiology)', school: 'University of Calcutta', year: '2012' },
      { degree: 'M.D. (General Medicine)', school: 'University of Calcutta', year: '2008' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2004' },
    ],
    certifications: ['Member, Cardiological Society of India'],
    specialties: ['Interventional Cardiology', 'Peripheral Vascular Interventions'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
  },
  {
    name: 'Dr. Kapildev Mondal',
    initials: 'KM',
    role: 'Consultant Cardiologist',
    specialty: 'Cardiology',
    slug: 'kapildev-mondal',
    branchIds: ['kolkata', 'balurghat'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed'] },
      { branchId: 'balurghat', days: ['Thu', 'Sat'] },
    ],
    education: [
      { degree: 'D.M. (Cardiology)', school: 'University of Calcutta', year: '2013' },
      { degree: 'M.D. (General Medicine)', school: 'University of Calcutta', year: '2009' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2005' },
    ],
    certifications: ['Member, Cardiological Society of India'],
    specialties: ['Heart Failure Management', 'Cardiac Rehabilitation'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
  },
  {
    name: 'Dr. Dharmendra Kumar Singh',
    initials: 'DKS',
    role: 'Consultant Cardiologist',
    specialty: 'Cardiology',
    slug: 'dharmendra-kumar-singh',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    ],
    education: [
      { degree: 'D.M. (Cardiology)', school: 'University of Calcutta', year: '2013' },
      { degree: 'D.N.B. (General Medicine)', school: 'National Board of Examinations', year: '2009' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2005' },
    ],
    certifications: ['Diplomate of National Board — Cardiology', 'Member, Cardiological Society of India'],
    specialties: ['Non-invasive Cardiology', 'Holter Monitoring', 'Stress Echocardiography'],
    languages: ['English', 'Hindi', 'Bengali'],
    publications: [],
  },

  // ═══════════════════════════════════════════
  // DEPARTMENT OF PAEDIATRIC CARDIOLOGY
  // ═══════════════════════════════════════════
  {
    name: 'Dr. Shyamajit Samaddar',
    initials: 'SS',
    role: 'Consultant Paediatric Cardiologist',
    specialty: 'Paediatric Cardiology',
    slug: 'shyamajit-samaddar',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Wed', 'Fri'] },
    ],
    education: [
      { degree: 'D.M. (Paediatric Cardiology)', school: 'University of Calcutta', year: '2014' },
      { degree: 'M.D. (Paediatrics)', school: 'University of Calcutta', year: '2010' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2006' },
    ],
    certifications: ['Member, Indian Academy of Paediatrics', 'Member, Paediatric Cardiac Society of India'],
    specialties: ['Paediatric Cardiac Care', 'Fetal Echocardiography', 'Congenital Heart Disease'],
    languages: ['English', 'Bengali'],
    publications: [],
  },
  {
    name: 'Dr. Lopamudra Mishra',
    initials: 'LM',
    role: 'Consultant Paediatric Cardiologist',
    specialty: 'Paediatric Cardiology',
    slug: 'lopamudra-mishra',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Tue', 'Thu', 'Sat'] },
    ],
    education: [
      { degree: 'D.M. (Paediatric Cardiology)', school: 'University of Calcutta', year: '2015' },
      { degree: 'M.D. (Paediatrics)', school: 'University of Calcutta', year: '2011' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2007' },
    ],
    certifications: ['Member, Indian Academy of Paediatrics'],
    specialties: ['Paediatric Cardiology', 'Neonatal Cardiac Care'],
    languages: ['English', 'Bengali', 'Odia', 'Hindi'],
    publications: [],
  },

  // ═══════════════════════════════════════════
  // DEPARTMENT OF GASTROENTEROLOGY
  // ═══════════════════════════════════════════
  {
    name: 'Dr. Bipul Barman',
    initials: 'BB',
    role: 'Senior Consultant Gastroenterologist',
    specialty: 'Gastroenterology',
    slug: 'bipul-barman',
    branchIds: ['kolkata', 'malda'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Thu', 'Fri'] },
      { branchId: 'malda', days: ['Wed'] },
    ],
    bio: 'Dr. Bipul Barman is a senior gastroenterologist with extensive experience in diagnosing and managing disorders of the digestive system. He specializes in endoscopic procedures and therapeutic gastroenterology at Sonoscan Healthcare.',
    education: [
      { degree: 'D.M. (Gastroenterology)', school: 'University of Calcutta', year: '2009' },
      { degree: 'M.D. (General Medicine)', school: 'University of Calcutta', year: '2005' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2001' },
    ],
    certifications: ['Member, Indian Society of Gastroenterology'],
    specialties: ['Therapeutic Endoscopy', 'Colonoscopy', 'Hepatology', 'IBD Management'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
    reviews: [
      { name: 'Sunil Sarkar', rating: 5, date: '2025-11-18', comment: 'Dr. Barman performed my endoscopy with great care. Minimal discomfort.' },
      { name: 'Kasturi Ghosh', rating: 4, date: '2025-10-12', comment: 'Thorough consultation and very knowledgeable about digestive disorders.' },
    ],
  },
  {
    name: 'Dr. Debasis Sardar',
    initials: 'DS',
    role: 'Consultant Gastroenterologist',
    specialty: 'Gastroenterology',
    slug: 'debasis-sardar',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    ],
    education: [
      { degree: 'D.M. (Gastroenterology)', school: 'University of Calcutta', year: '2011' },
      { degree: 'M.D. (General Medicine)', school: 'University of Calcutta', year: '2007' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2003' },
    ],
    certifications: ['Member, Indian Society of Gastroenterology'],
    specialties: ['Upper GI Endoscopy', 'Colonoscopy', 'Liver Disease Management'],
    languages: ['English', 'Bengali'],
    publications: [],
  },
  {
    name: 'Dr. Tuhin Mitra',
    initials: 'TM',
    role: 'Consultant Gastroenterologist',
    specialty: 'Gastroenterology',
    slug: 'tuhin-mitra',
    branchIds: ['kolkata', 'malda', 'gangarampur'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Wed', 'Fri'] },
      { branchId: 'malda', days: ['Tue', 'Thu', 'Sat'] },
      { branchId: 'gangarampur', days: ['Thu'] },
    ],
    education: [
      { degree: 'D.M. (Gastroenterology)', school: 'University of Calcutta', year: '2012' },
      { degree: 'M.D. (General Medicine)', school: 'University of Calcutta', year: '2008' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2004' },
    ],
    certifications: ['Member, Indian Society of Gastroenterology'],
    specialties: ['Hepatology', 'Pancreatic Disorders', 'Endoscopic Ultrasound'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
  },
  {
    name: 'Dr. Sugata Narayan Biswas',
    initials: 'SNB',
    role: 'Consultant Gastroenterologist',
    specialty: 'Gastroenterology',
    slug: 'sugata-narayan-biswas',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    ],
    education: [
      { degree: 'D.M. (Gastroenterology)', school: 'University of Calcutta', year: '2013' },
      { degree: 'M.D. (General Medicine)', school: 'University of Calcutta', year: '2009' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2005' },
    ],
    certifications: ['Member, Indian Society of Gastroenterology'],
    specialties: ['Therapeutic Endoscopy', 'GI Motility Disorders', 'Nutritional Support'],
    languages: ['English', 'Bengali'],
    publications: [],
  },

  // ═══════════════════════════════════════════
  // DEPARTMENT OF NEUROLOGY
  // ═══════════════════════════════════════════
  {
    name: 'Dr. Shankar Prasad Saha',
    initials: 'SPS',
    role: 'Senior Consultant Neurologist',
    specialty: 'Neurology',
    slug: 'shankar-prasad-saha',
    branchIds: ['kolkata', 'malda', 'gangarampur'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Thu', 'Fri'] },
      { branchId: 'malda', days: ['Wed'] },
      { branchId: 'gangarampur', days: ['Sat'] },
    ],
    bio: 'Dr. Shankar Prasad Saha is a senior neurologist specializing in neurological disorders and stroke management. His expertise in clinical neurology and neurodiagnostics provides comprehensive care for patients with complex neurological conditions.',
    education: [
      { degree: 'D.M. (Neurology)', school: 'University of Calcutta', year: '2010' },
      { degree: 'M.D. (General Medicine)', school: 'University of Calcutta', year: '2006' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2002' },
    ],
    certifications: ['Member, Neurological Society of India'],
    specialties: ['Stroke Management', 'Epilepsy Care', 'Headache Disorders', 'Neuromuscular Disorders'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
    reviews: [
      { name: 'Debashis Roy', rating: 5, date: '2025-12-05', comment: 'Dr. Saha is an exceptional neurologist. His treatment for my migraine has been life-changing.' },
      { name: 'Mala Chatterjee', rating: 5, date: '2025-10-28', comment: 'Very compassionate doctor. He listened to all my concerns patiently.' },
    ],
  },
  {
    name: 'Dr. Arindam Das',
    initials: 'AD',
    role: 'Consultant Neurologist',
    specialty: 'Neurology',
    slug: 'arindam-das',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    ],
    education: [
      { degree: 'D.M. (Neurology)', school: 'University of Calcutta', year: '2012' },
      { degree: 'M.D. (General Medicine)', school: 'University of Calcutta', year: '2008' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2004' },
    ],
    certifications: ['Member, Neurological Society of India'],
    specialties: ['Neurodiagnostics', 'EEG Interpretation', 'Movement Disorders'],
    languages: ['English', 'Bengali'],
    publications: [],
  },
  {
    name: 'Dr. Barun Kumar Sen',
    initials: 'BKS',
    role: 'Consultant Neurologist',
    specialty: 'Neurology',
    slug: 'barun-kumar-sen',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    ],
    education: [
      { degree: 'D.M. (Neurology)', school: 'University of Calcutta', year: '2013' },
      { degree: 'M.D. (General Medicine)', school: 'University of Calcutta', year: '2009' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2005' },
    ],
    certifications: ['Member, Neurological Society of India'],
    specialties: ['Cerebrovascular Diseases', 'Dementia Care', 'Neuropathic Pain Management'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
  },

  // ═══════════════════════════════════════════
  // DEPARTMENT OF E.N.T
  // ═══════════════════════════════════════════
  {
    name: 'Dr. Souvik Roychowdhury',
    initials: 'SR',
    role: 'Senior Consultant ENT Specialist',
    specialty: 'ENT',
    slug: 'souvik-roychowdhury',
    branchIds: ['kolkata', 'malda'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Thu', 'Fri'] },
      { branchId: 'malda', days: ['Wed'] },
    ],
    bio: 'Dr. Souvik Roychowdhury is a senior ENT surgeon with expertise in otology, rhinology, and head & neck surgeries. He provides comprehensive ear, nose, and throat care at Sonoscan Healthcare.',
    education: [
      { degree: 'M.S. (ENT)', school: 'University of Calcutta', year: '2008' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2004' },
    ],
    certifications: ['Member, Association of Otolaryngologists of India'],
    specialties: ['Otology', 'Rhinology', 'Endoscopic Sinus Surgery', 'Head & Neck Surgery'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
    reviews: [
      { name: 'Rajat Sen', rating: 5, date: '2025-11-22', comment: 'Dr. Roychowdhury performed my sinus surgery. Excellent results and quick recovery.' },
      { name: 'Pritam Dutta', rating: 4, date: '2025-10-08', comment: 'Professional ENT specialist. The consultation was thorough and helpful.' },
    ],
  },
  {
    name: 'Dr. Diptanshu Mukherjee',
    initials: 'DM',
    role: 'Consultant ENT Specialist',
    specialty: 'ENT',
    slug: 'diptanshu-mukherjee',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    ],
    education: [
      { degree: 'M.S. (ENT)', school: 'University of Calcutta', year: '2010' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2005' },
    ],
    certifications: ['Member, Association of Otolaryngologists of India'],
    specialties: ['Pediatric ENT', 'Laryngology', 'Hearing Disorders'],
    languages: ['English', 'Bengali'],
    publications: [],
  },
  // ═══════════════════════════════════════════
  // DEPARTMENT OF PFT
  // ═══════════════════════════════════════════
  {
    name: 'Dr. Priyanka Ghosh',
    initials: 'PG',
    role: 'Consultant Pulmonologist',
    specialty: 'PFT',
    slug: 'priyanka-ghosh',
    branchIds: ['kolkata', 'malda', 'gangarampur'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed'] },
      { branchId: 'malda', days: ['Thu', 'Fri', 'Sat'] },
      { branchId: 'gangarampur', days: ['Mon'] },
    ],
    education: [
      { degree: 'D.N.B. (Respiratory Diseases)', school: 'National Board of Examinations', year: '2012' },
      { degree: 'M.D. (Pulmonary Medicine)', school: 'University of Calcutta', year: '2012' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2007' },
    ],
    certifications: ['Diplomate of National Board — Respiratory Diseases', 'Member, Indian Chest Society'],
    specialties: ['Pulmonary Function Testing', 'Spirometry', 'Asthma Management'],
    languages: ['English', 'Bengali', 'Hindi'],
    publications: [],
  },
  {
    name: 'Dr. Shelley Shamim',
    initials: 'SS',
    role: 'Consultant Pulmonologist',
    specialty: 'PFT',
    slug: 'shelley-shamim',
    branchIds: ['kolkata'],
    branchSchedule: [
      { branchId: 'kolkata', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    ],
    education: [
      { degree: 'M.D. (Pulmonary Medicine)', school: 'University of Calcutta', year: '2013' },
      { degree: 'M.B.B.S.', school: 'University of Calcutta', year: '2008' },
    ],
    certifications: ['Member, Indian Chest Society'],
    specialties: ['Pulmonary Function Testing', 'Spirometry', 'Respiratory Diagnostics'],
    languages: ['English', 'Bengali', 'Urdu', 'Hindi'],
    publications: [],
  },
]

// ──────────────────────────────────────────────
// Specialty-based profile images (Unsplash)
// ──────────────────────────────────────────────
const specialtyImageMap: Record<string, string> = {
  'Pathology':
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
  'Radiology':
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
  'Cardiology':
    'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
  'Paediatric Cardiology':
    'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&q=80',
  'Gastroenterology':
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
  'Neurology':
    'https://images.unsplash.com/photo-1612531386530-97286d97c2b2?w=400&q=80',
  'ENT':
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80',
  'PFT':
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80',
}

const defaultDoctorImage =
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80'

function getDoctorImage(doc: Doctor): string {
  return doc.image ?? specialtyImageMap[doc.specialty] ?? defaultDoctorImage
}

// ──────────────────────────────────────────────
// doctorsData: Record keyed by slug
// ──────────────────────────────────────────────
export const doctorsData: Record<string, Doctor> = {}
for (const doc of allDoctors) {
  doctorsData[doc.slug] = { ...doc, image: getDoctorImage(doc) }
}

// ──────────────────────────────────────────────
// teamMembers: Simplified list for cards & nav
// ──────────────────────────────────────────────
export const teamMembers: TeamMember[] = allDoctors.map(doc => ({
  name: doc.name,
  role: doc.role,
  specialty: doc.specialty,
  initials: doc.initials,
  slug: doc.slug,
  branchIds: doc.branchIds,
  image: getDoctorImage(doc),
}))

// ──────────────────────────────────────────────
// appointmentDoctors: For appointment booking flow
// ──────────────────────────────────────────────
export const appointmentDoctors: AppointmentDoctor[] = allDoctors.map(doc => ({
  name: doc.name,
  specialty: `${doc.role} — ${doc.specialty}`,
  initials: doc.initials,
  branchSchedule: doc.branchSchedule,
  branchIds: doc.branchIds,
}))


