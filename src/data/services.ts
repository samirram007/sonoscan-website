import type { Service, ServiceCard } from '../features/services/schema'

export const servicesData: Service[] = [
  {
    id: 'primary-care',
    icon: '🔬',
    title: 'Pathology & Lab Diagnostics',
    tagline: 'NABL-accredited laboratory testing with uncompromising accuracy',
    description:
      'Sonoscan\'s NABL-accredited pathology laboratory is equipped with fully automated, computer-interfaced high-throughput analysers. Our team of experienced pathologists and technicians delivers accurate, same-day reports for a comprehensive range of tests — from routine haematology and biochemistry to advanced molecular diagnostics and histopathology. Every sample is bar-coded and tracked through a rigorous quality-control process to ensure precision and reliability.',
    details: [
      'Complete haematology & coagulation studies',
      'Clinical biochemistry & hormone assays',
      'Histopathology, FNAC & liquid-based cytology',
      'Molecular biology: PCR, GeneXpert & viral load testing',
      'Microbiology: cultures, identification & sensitivity',
      'Immunology: TORCH, hepatitis & autoimmune panels',
    ],
    pricing: [
      { plan: 'Basic Health Check', price: '₹1,250', note: 'CBC, lipid profile, LFT, T3/T4/TSH, vitamin D-3 & more' },
      { plan: 'Advanced Health Check', price: '₹1,750', note: 'Basic panel + urine microalbumin & creatinine ratio' },
      { plan: 'Comprehensive Panel', price: '₹3,350', note: 'Executive check-up with USG whole abdomen & chest X-ray' },
    ],
    doctors: ['Dr. Debasis Banerjee', 'Dr. Susruta Sen'],
  },
  {
    id: 'mental-health',
    icon: '🩻',
    title: 'Radiology & Imaging',
    tagline: 'Advanced 3 Tesla Silent MRI, 128-Slice CT & Digital Radiography',
    description:
      'Sonoscan offers state-of-the-art diagnostic imaging with a 3 Tesla Silent MRI, 128/384 Slice CT Scanner, DR System X-Ray, and high-end 4D ultrasound. Our radiology department covers everything from routine X-rays and mammography to advanced cardiac MRI, MR angiography, CT coronary angiography, and colour Doppler studies. All imaging is performed by qualified radiologists using the latest low-dose protocols for patient safety.',
    details: [
      '3 Tesla Silent MRI — brain, spine, MSK, cardiac & MR angiography',
      '128/384 Slice CT Scan — ultra-low-dose with cardiac CT angiography',
      'DR System X-Ray — routine & contrast studies (barium meal, IVU, HSG)',
      'High-end 4D ultrasound & colour Doppler',
      'Digital mammography & bone mineral density (BMD)',
      'Digital OPG & cephalometry for dental imaging',
    ],
    pricing: [
      { plan: 'Digital X-Ray', price: '₹250', note: 'Single view with digital report' },
      { plan: 'USG Whole Abdomen', price: '₹1,200', note: 'High-resolution 4D ultrasound with Doppler' },
      { plan: 'MRI Scan (Single Region)', price: '₹4,500', note: '3 Tesla Silent MRI with consultant report' },
    ],
    doctors: ['Dr. Sanjukta Sarkar', 'Dr. Suman Saraogi'],
  },
  {
    id: 'dental-care',
    icon: '❤️',
    title: 'Multi-Specialty OPD',
    tagline: 'Expert cardiology, neurology, gastroenterology & more under one roof',
    description:
      'Sonoscan\'s multi-specialty outpatient department brings together a panel of highly qualified specialists across cardiology, neurology, gastroenterology, ENT, pulmonology, paediatrics, orthopaedics, and other disciplines. Each consultant holds advanced qualifications (D.M., M.S., D.N.B.) and provides comprehensive diagnostic evaluations, treatment planning, and ongoing care — all in one convenient location with direct access to Sonoscan\'s advanced diagnostic facilities.',
    details: [
      'Cardiology — ECG, TMT, echocardiography, Holter monitoring',
      'Neurology — digital EEG, EMG, NCV, VEP & BERA',
      'Gastroenterology — upper GI endoscopy & colonoscopy',
      'ENT — audiometry, vestibular testing & endoscopic sinus evaluation',
      'Pulmonology — PFT/spirometry & chest medicine consultation',
      'Paediatric cardiology — fetal echo & congenital heart assessment',
    ],
    pricing: [
      { plan: 'Specialist Consultation', price: '₹500', note: 'Consultation with qualified OPD specialist' },
      { plan: 'ECG & Cardiologist Review', price: '₹800', note: '12-lead ECG with cardiologist interpretation' },
      { plan: 'Echocardiography Package', price: '₹2,090', note: 'Full 2D echo with Doppler & specialist report' },
    ],
    doctors: ['Dr. Malay Acharya', 'Dr. Bipul Barman'],
  },
  {
    id: 'eye-care',
    icon: '🏥',
    title: 'Health Check Packages',
    tagline: 'Comprehensive preventive health checkups tailored for every age',
    description:
      'Sonoscan offers a wide range of structured health checkup packages designed for every stage of life — from basic wellness screening to whole-body comprehensive assessments. Each package includes a curated panel of tests, imaging, and specialist consultations where applicable. Our diabetic, cardiac, pre-marital, executive, and senior citizen packages provide targeted screening for early detection and preventive care.',
    details: [
      'Basic Health Check — CBC, lipid profile, LFT, TSH, vitamin D-3',
      'Diabetic Check-Up — HbA1c, fasting/PP glucose, kidney profile',
      'Cardiological Check-Up — ECG, echo, lipid profile & chest X-ray',
      'Executive Health Check — USG whole abdomen, ECG & X-ray',
      'Master Health Check — full panel + echo + cancer markers',
      'Senior Citizen Check — comprehensive + CT brain (whole body)',
    ],
    pricing: [
      { plan: 'Basic Health Check', price: '₹1,250', note: 'Essential blood panel & vitamin screening' },
      { plan: 'Executive Health Check', price: '₹3,350', note: 'Full panel + USG whole abdomen + ECG + X-ray' },
      { plan: 'Master Health Check', price: '₹5,800', note: 'Comprehensive panel + echocardiography + cancer markers' },
    ],
    doctors: ['Dr. Shankar Prasad Saha', 'Dr. Tuhin Mitra'],
  },
]

export const serviceCards: ServiceCard[] = [
  { id: 'primary-care', title: 'Pathology & Lab Diagnostics', description: 'NABL-accredited lab testing with same-day reporting for haematology, biochemistry, histopathology, and molecular diagnostics.', icon: '🔬' },
  { id: 'mental-health', title: 'Radiology & Imaging', description: 'Advanced 3 Tesla Silent MRI, 128-slice CT, digital X-ray, 4D ultrasound, mammography, and bone density scans.', icon: '🩻' },
  { id: 'dental-care', title: 'Multi-Specialty OPD', description: 'Expert consultations in cardiology, neurology, gastroenterology, ENT and more with direct access to advanced diagnostics.', icon: '❤️' },
  { id: 'eye-care', title: 'Health Check Packages', description: 'Comprehensive preventive health checkups from basic wellness to whole-body assessments with CT and cancer screening.', icon: '🏥' },
]

export const planFeatures: string[] = [
  'Complete Blood Count',
  'Glucose Fasting & HbA1c',
  'Liver & Kidney Function Tests',
  'Lipid Profile & Cardiac Markers',
  'Chest X-Ray (PA view)',
  'ECG & Stress Test (TMT)',
  'USG Whole Abdomen',
  'Thyroid Profile (T3/T4/TSH)',
  'Vitamin D-3 & B12 Assay',
]

export const pricingPlans = [
  { name: 'Basic Health Check', monthly: '₹1,250', yearly: '₹1,150', description: 'Essential blood panel & vitamin screening — per person' },
  { name: 'Executive Health Check', monthly: '₹3,350', yearly: '₹3,050', description: 'Comprehensive panel + USG + ECG + X-ray — per person', popular: true },
  { name: 'Master Health Check', monthly: '₹5,800', yearly: '₹5,200', description: 'Full assessment + echo + cancer markers — per person' },
]
