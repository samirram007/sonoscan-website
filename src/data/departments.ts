import { diagnosticDepartments } from './diagnosticDepartments'
import type { DiagnosticSection } from './diagnosticDepartments'

export interface Department {
  id: string
  name: string
  icon: string
  tagline: string
  description: string
  services: string[]
  branchIds: string[]
  sourceTitle: string
  intro: string
  sections: DiagnosticSection[]
}

const diagnosticById = new Map(diagnosticDepartments.map(d => [d.id, d]))

function diag(id: string) {
  const d = diagnosticById.get(id)
  if (!d) throw new Error(`Missing diagnostic department: ${id}`)
  return d
}

export const departments: Department[] = [
  {
    id: 'pathology',
    name: diag('pathology').name,
    icon: diag('pathology').icon,
    tagline: 'NABL-accredited laboratory testing with uncompromising accuracy',
    description:
      'Our fully automated, computer-interfaced laboratory delivers accurate, same-day reports across haematology, biochemistry, immunology, molecular biology, microbiology, and histopathology.',
    services: [
      'Haematology & coagulation studies',
      'Clinical biochemistry & hormone assays',
      'Histopathology, FNAC & liquid-based cytology',
      'Molecular biology — PCR, GeneXpert & viral load',
      'Microbiology — cultures & sensitivity',
      'Immunology — TORCH, hepatitis & autoimmune panels',
    ],
    branchIds: diag('pathology').branchIds,
    sourceTitle: diag('pathology').sourceTitle,
    intro: diag('pathology').intro,
    sections: diag('pathology').sections,
  },
  {
    id: 'radiology',
    name: diag('radiology').name,
    icon: diag('radiology').icon,
    tagline: '3 Tesla Silent MRI, 128/384 Slice CT & Digital Radiography',
    description:
      'State-of-the-art diagnostic imaging with silent MRI, multi-slice CT, DR X-ray, 4D ultrasound, mammography, and bone density studies — performed by qualified radiologists with low-dose protocols.',
    services: [
      '3 Tesla Silent MRI — brain, spine, MSK, cardiac & MR angiography',
      '128/384 Slice CT — ultra-low-dose with cardiac CT angiography',
      'DR System X-Ray — routine & contrast studies',
      'High-end 4D ultrasound & colour Doppler',
      'Digital mammography & bone mineral density (BMD)',
      'Digital OPG & cephalometry',
    ],
    branchIds: diag('radiology').branchIds,
    sourceTitle: diag('radiology').sourceTitle,
    intro: diag('radiology').intro,
    sections: diag('radiology').sections,
  },
  {
    id: 'cardiology',
    name: diag('cardiology').name,
    icon: diag('cardiology').icon,
    tagline: 'Non-invasive cardiac diagnostics under experienced cardiologists',
    description:
      'Sophisticated non-invasive cardiac diagnostic modules covering ECG, echocardiography, stress testing, and rhythm monitoring to support precise cardiac evaluation and treatment planning.',
    services: [
      'Digital ECG & Holter monitoring',
      'Echocardiography & colour Doppler',
      'Fetal & paediatric echocardiography',
      'Tread Mill Test (TMT)',
      '24-hour blood pressure recording',
    ],
    branchIds: diag('cardiology').branchIds,
    sourceTitle: diag('cardiology').sourceTitle,
    intro: diag('cardiology').intro,
    sections: diag('cardiology').sections,
  },
  {
    id: 'paediatric-cardiology',
    name: 'Paediatric Cardiology',
    icon: '👶',
    tagline: 'Specialized cardiac care for children',
    description:
      'Dedicated paediatric cardiology consultations with fetal and paediatric echocardiography to assess congenital heart conditions and guide early intervention.',
    services: [
      'Fetal echocardiography',
      'Paediatric echocardiography',
      'Congenital heart assessment',
    ],
    branchIds: ['kolkata'],
    sourceTitle: 'Paediatric Cardiology Department',
    intro: 'Dedicated paediatric cardiology consultations with fetal and paediatric echocardiography, performed under the supervision of experienced paediatric cardiologists.',
    sections: [
      {
        title: 'Paediatric Cardiology',
        description: 'Specialized cardiac evaluation for infants and children.',
        tests: ['Fetal echocardiography', 'Paediatric echocardiography', 'Congenital heart assessment'],
        img: '',
      },
    ],
  },
  {
    id: 'gastroenterology',
    name: diag('gastroenterology').name,
    icon: diag('gastroenterology').icon,
    tagline: 'Comprehensive digestive health diagnostics',
    description:
      'Consultations and diagnostic evaluation for digestive system disorders with upper GI endoscopy and colonoscopy supported by our advanced imaging and pathology services.',
    services: [
      'Upper GI endoscopy',
      'Colonoscopy',
      'Liver & pancreatic function evaluation',
      'H. pylori & gastroenterology panels',
    ],
    branchIds: diag('gastroenterology').branchIds,
    sourceTitle: diag('gastroenterology').sourceTitle,
    intro: diag('gastroenterology').intro,
    sections: diag('gastroenterology').sections,
  },
  {
    id: 'neurology',
    name: diag('neurology').name,
    icon: diag('neurology').icon,
    tagline: 'Advanced neuro-diagnostics with digital systems',
    description:
      'Neurology consultations backed by digital EEG, EMG, NCV, VEP, and BERA studies alongside 3 Tesla MRI for precise evaluation of neurological conditions.',
    services: [
      'Digital EEG & EMG / NCV studies',
      'VEP & BERA auditory assessment',
      'Brain & spine MRI evaluation',
      'Headache, epilepsy & stroke care',
    ],
    branchIds: diag('neurology').branchIds,
    sourceTitle: diag('neurology').sourceTitle,
    intro: diag('neurology').intro,
    sections: diag('neurology').sections,
  },
  {
    id: 'ent',
    name: diag('ent').name,
    icon: diag('ent').icon,
    tagline: 'Ear, nose & throat consultations and diagnostics',
    description:
      'ENT specialist consultations with audiometry, vestibular testing, and endoscopic sinus evaluation, complemented by digital imaging for accurate diagnosis.',
    services: [
      'Audiometry & hearing evaluation',
      'Vestibular / balance testing',
      'Endoscopic sinus evaluation',
      'ENT imaging & pathology support',
    ],
    branchIds: diag('ent').branchIds,
    sourceTitle: diag('ent').sourceTitle,
    intro: diag('ent').intro,
    sections: diag('ent').sections,
  },
  {
    id: 'urology',
    name: diag('urology').name,
    icon: diag('urology').icon,
    tagline: 'Urological diagnostics with qualified urologists',
    description:
      'Urological diagnostic services including uroflowmetry for the evaluation of lower urinary tract function, performed under the supervision of qualified urologists.',
    services: ['Uroflowmetry', 'Urological evaluation & follow-up'],
    branchIds: diag('urology').branchIds,
    sourceTitle: diag('urology').sourceTitle,
    intro: diag('urology').intro,
    sections: diag('urology').sections,
  },
  {
    id: 'dental',
    name: diag('dental').name,
    icon: diag('dental').icon,
    tagline: 'State-of-the-art dental care — preventive to cosmetic',
    description:
      'At SONOSCAN, dentistry goes beyond treatment — it is about comfort, precision, and lasting confidence. Our advanced Dental Unit combines modern technology, experienced specialists, and patient-friendly care under one roof.',
    services: [
      'Digital OPG X-Ray & panoramic imaging',
      'Preventive, restorative & cosmetic care',
      'Orthodontics, braces & aligners',
      'Implants & prosthetics',
      'Emergency & pain relief',
    ],
    branchIds: diag('dental').branchIds,
    sourceTitle: diag('dental').sourceTitle,
    intro: diag('dental').intro,
    sections: diag('dental').sections,
  },
  {
    id: 'skin',
    name: diag('skin').name,
    icon: diag('skin').icon,
    tagline: 'Medical & aesthetic dermatology led by experts',
    description:
      'Our Skin & Aesthetic Unit is led by experienced dermatologists who combine medical expertise with advanced technology. From chronic skin conditions to cosmetic procedures, every treatment is backed by medical science and clinically proven methods.',
    services: [
      'Acne, scar & pigmentation correction',
      'Vitiligo & dermato surgery',
      'Hair & nail restoration',
      'Medical facials & anti-aging solutions',
      'Eczema, psoriasis & allergy care',
    ],
    branchIds: diag('skin').branchIds,
    sourceTitle: diag('skin').sourceTitle,
    intro: diag('skin').intro,
    sections: diag('skin').sections,
  },
  {
    id: 'others',
    name: diag('others').name,
    icon: diag('others').icon,
    tagline: 'Specialised functional & vascular studies',
    description:
      'In addition to our regular diagnostic procedures, we offer a range of specialised functional and vascular tests to support comprehensive patient evaluation.',
    services: ['Lung Function Test', 'Carotid Doppler Study', 'Peripheral Vascular Study'],
    branchIds: diag('others').branchIds,
    sourceTitle: diag('others').sourceTitle,
    intro: diag('others').intro,
    sections: diag('others').sections,
  },
]

export const outdoorDoctorDepartments: string[] = [
  'Cardiology',
  'Cardiothoracic Surgeon',
  'Chest Medicine',
  'Dermatology',
  'Endocrinology',
  'ENT Surgeon',
  'Gastroenterology',
  'General Physician',
  'General Surgeon',
  'General Surgery',
  'Gynaecology',
  'Haematology',
  'Infectious Diseases',
  'Medicine',
  'Nephrology',
  'Neuro Medicine',
  'Neuro Surgery',
  'Neurology',
  'Oncology',
  'Ophthalmology',
  'Orthopaedic',
  'Orthopaedic Surgeon',
  'Paediatric',
  'Paediatric Cardio',
  'Paediatric Cardiology',
  'Paediatric Endocrinology',
  'Physiatry',
  'Physician & Critical Care',
  'Psychiatry',
  'Pulmonology',
  'Rheumatology',
  'Urology',
]
