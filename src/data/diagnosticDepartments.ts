// ──────────────────────────────────────────────
// Diagnostic department content — sourced from
// https://www.sonoscanhealthcare.net/sono/diagnostic-doctor.php
// and its per-department detail pages (services.php?d=...).
// Each department carries an intro, per-branch availability and
// the actual procedure/test sections shown on the source site.
// ──────────────────────────────────────────────

export interface DiagnosticSection {
  title: string
  description: string
  tests: string[]
  img?: string
}

export interface DiagnosticDepartment {
  id: string
  name: string
  icon: string
  sourceTitle: string
  intro: string
  branchIds: string[]
  sections: DiagnosticSection[]
}

export const diagnosticDepartments: DiagnosticDepartment[] = [
  {
    id: "pathology",
    name: "Pathology & Lab Diagnostics",
    icon: "🔬",
    sourceTitle: "NABL ACCREDITED PATHOLOGY DEPARTMENT",
    intro: "SONOSCAN under takes a wide range of Pathological Examinations in a NABL Accredited state-of-the art Laboratory under the supervision of qualified experienced Pathologists and technical staff. In order to maintain high Laboratory standard, Internal & External Quality Control are performed regularly . We have bar-coded sample identification and computer interfacing systems for report generation in our laboratory.",
    branchIds: ["kolkata","malda","balurghat","gangarampur"],
    sections: [
      {
        title: "HAEMATOLOGY",
        description: "CBC, Complete Haemogram, Coagulation tests, Diagnosis of Thalassemia and other Haemolytic anaemias, Bone Marrow Examination etc.",
        tests: ["Wide range of routine as well as special tests done","Offers a wide array of screening, diagnostic, prognostic and monitoring tests for hematopoietic diseases.","Services include comprehensive testing for thrombotic and bleeding disorders.","Introduced gel technology for blood grouping."],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626446359_1626428181_haematology.jpg",
      },
      {
        title: "BIOCHEMISTRY & SEROLOGY",
        description: "Routine and special Biochemical parameters, Hormone assay, Specially Lactate, Ammonia, D.Dimer, IL6, C3, C4, Ceruloplasmin, ACL, Lupas Anticoagulent, APLA Profile, Special Maternal Marker – Double Marker, Triple Marker, Quadruple Marker & Others.",
        tests: ["Well-equipped department providing routine and special diagnostic as well as screening services.","With all state-of-the-art fully automated high throughput instruments employing spectrophotometric, turbidimetric, electro chemiluminiscent and ELISA techniques.","HPLC technique for estimation of HbA1c as well as for screening of haemoglobinopathies. Reporting of HbA1c in dual units(NGSP and IFCC)","The fetal risk assessment menu is designed to aid the clinician identify, manage, and follow up high-risk and/or complicated pregnancies.","Maternal serum screening (Triple Test) is used to detect cases of neural tube defects, trisomy 18, and trisomy 21 (Down syndrome).","Analyses are performed by a dedicated team of laboratory technicians. Same day reporting for majority of tests."],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626431145_cobas6000.jpg",
      },
      {
        title: "IMMUNOLOGY",
        description: "",
        tests: ["Wide range of routine as well as special tests done","TORCH Panel, Hepatitis Panel, Autoimmune Panel, Hepatitis-B Profile, Liver Panel (AMA, LKM Antibody, LC-1, SLA/LP), ANA, DSDNA, ANA Profile by Immunofluorescence technology, ANCA (C+P) etc."],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1642000441_PIC-8.jpg",
      },
      {
        title: "MOLECULAR BIOLOGY",
        description: "",
        tests: ["Wide range of routine as well as special tests done","TBPCR (genxpert), HLA B27 PCR, BCR ABL PCR, Hepatities-B viral load DNA PCR, HIV RNA PCR, HCV RNA PCR etc."],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1642000527_PIC-3.jpg",
      },
      {
        title: "MICROBIOLOGY",
        description: "Automated Aerobic and Anaerobic culture, automated microbial identification and antibiotic susceptibility test. Mycobacterial culture, fungal Culture, Blood Culture and others.",
        tests: ["Entire panel of routine as well as special tests done.","Well-equipped analytical expertise in all areas of microbiology including antimicrobial susceptibility testing, bacteriology, mycobacteriology, mycology, parasitology, and virology.","Range of testing from routine bacterial cultures and serological assays to the latest in molecular-based techniques, such as real-time qualitative and quantitative PCR & GeneXpert technology Serological section performs various antigen and antibody testing and confirmation for infectious diseases.","Immunofluorescence tests for autoimmune markers."],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626450781_micro.jpg",
      },
      {
        title: "HISTOPATHOLOGY, CYTOPATHOLOGY, FNAC & BONE MARROW STUDY",
        description: "Direct USG & CT guided FNAC, PAP Staining of gynaecological smear & Imprint smear. Body fluid & Bal fluid cytology. Brush cytology, Urine Cytology. Different types of biopsies and Cell Block.",
        tests: ["LIQUID BASED CYTOLOGY (LBC) is a relatively new technology intended to improve detection of cytological abnormalities and considered as a new, efficacious and highly sensitive way of cervical screening and detection of malignant cell in fluid specimen.","Cell block preparation from fluid specimens and examination are routinely done for enhanced detection of malignant cells.","Routine diagnostic histopathology service aided by various types of special stains. Reporting of malignant-tumours according to College of American Pathologist (CAP) Protocol."],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626696206_histo kol.jpg",
      },
      {
        title: "CLINICAL PATHOLOGY",
        description: "Wide array of tests available for blood, urine, CSF and other body fluid & Same day Reporting Routine & Special tests of Urine, Stool, Semen & Body Fluids etc.",
        tests: [],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626450602_cli.jpg",
      },
      {
        title: "SPECIAL PARAMETERS",
        description: "",
        tests: ["Wide range of routine as well as special tests done","Tumour Marker, CA 125, AFP, CA 15-3, CA 19.9, CEA, Beta 2 Microglobulin."],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1642000600_PIC-9.jpg",
      },
    ],
  },
  {
    id: "radiology",
    name: "Radiology & Imaging",
    icon: "🩻",
    sourceTitle: "RADIOLOGY & IMAGING DEPARTMENT",
    intro: "The Department of Radiology & Imaging at SONOSCAN Kolkata is equipped with the most advanced instruments of international standard and backed by a team of highly qualified and skilled radiologists to further enhance its range of conventional and interventional radiological procedures.",
    branchIds: ["kolkata","malda","balurghat","gangarampur"],
    sections: [
      {
        title: "3 TESLA SILENT MRI",
        description: "Brain, Spine, Head & Neck, Chest, Abdomen, Musculoskeletal, Angiography, MRCP, MR Spectroscopy, Dynamic Scan, Fistulogram and others",
        tests: ["Quiet Suite.","Dedicated Shoulder, Knee & Breast coils.","Cardiac MRI – Viability & Morphology Study Done.","Diffusion Tensor Imaging.","Head, Neck & Renal Angiography without contrast."],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626451878_MRI.jpg",
      },
      {
        title: "384 SLICE CT SCAN",
        description: "Brain, Spine, Head & Neck, Chest, Abdomen, Great Vessels, Cerebral, Carotid, Renal, Peripheral Angiography, Cardiac C.T. Angiography etc.",
        tests: ["Ultra Low Dose CT Scanner- Least Radiation Dose to Patient.","Cardiac Scanning ( Coronary Angiography) Non invasive cardiac scanning for detection of Cardiac diseases in a few seconds with minimal radiation dose and excellent image detail even at low radiation doses.","High Detector Coverage- Very Fast Scanning, helps to scan patients with less breath holding capacity.","High Resolution Scanner- More diagnostic information than conventional CT scanner for most accurate diagnosis.","Peripheral Angiography Diagnosis of vascular diseases including cases which cannot be detected by conventional CT scanner."],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626452050_ct sCAN.jpg",
      },
      {
        title: "DR SYSTEM X-RAY",
        description: "Routine X-Ray, Ba-Meal & Ba-Swallow, I.V.U, M.C.U, Ascending Urethrogram, Sinogram, HSG and others.",
        tests: ["Powered by completely digital equipments, the Direct Radiography wing covers Routine & Special X-Ray ."],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626452108_DR.jpg",
      },
      {
        title: "Mammography",
        description: "Improved Images. High Level of diagnostic Accuracy. Very Negligble radiation.",
        tests: [],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1719925477_MAMMOGRAPHY.jpg",
      },
      {
        title: "Bone Mineral Density",
        description: "64 Detector System. High Resolution Image. Very Quick Procedure time (30 seconds). Greater Long term precision",
        tests: [],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1691587296_BMD PIC.jpg",
      },
      {
        title: "Digital OPG & Cephalometry",
        description: "High Quality Images. Simple & Fast Operation. Powered by CS Imaging Version B. A New Level of Sharpness",
        tests: [],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1691587991_OPG.jpg",
      },
      {
        title: "HIGH END 4D ULTRASONOGRAPHY & COLOUR DOPPLER",
        description: "Abdominal, Obstetrics and Gynaecological, Foetal Anomaly, Small Parts, Joints, Soft Tissues, Trans Vaginal, Trans Rectal & Image Guided procedures etc.",
        tests: ["Engineered for efficiency and reliability, and powered by international standard equipments which provide outstanding image quality, advanced features, and improved usability."],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626452184_USG.jpg",
      },
    ],
  },
  {
    id: "cardiology",
    name: "Cardiology",
    icon: "❤️",
    sourceTitle: "CARDIOLOGY DEPARTMENT",
    intro: "The Cardiology department is designed with sophisticated, non-invasive diagnostic modules acquired from internationally reputed manufacturers. Various cardiac procedures like,",
    branchIds: ["kolkata","malda","balurghat","gangarampur"],
    sections: [
      {
        title: "CARDIOLOGY",
        description: "",
        tests: ["Digital ECG.","Echocardiography & Colour Doppler","Foetal Echocardiography","Paediatric Echocardiography","Tread Mill Test (TMT)","Holter Monitoring","24 hour Blood Pressure Recording"],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626452367_TMT.jpg",
      },
    ],
  },
  {
    id: "neurology",
    name: "Neurology",
    icon: "🧠",
    sourceTitle: "NEUROLOGY DEPARTMENT",
    intro: "With the rise of incidences of neurological disorders across the world, SONOSCAN, under the supervision of experienced neurologists, has introduced a wide range of non-invasive diagnostic tests like:",
    branchIds: ["kolkata","malda","balurghat","gangarampur"],
    sections: [
      {
        title: "NEUROLOGY",
        description: "",
        tests: ["Digital EEG","EMG","NCV","VEP","BERA and SSEP"],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626495788_EEG.jpg",
      },
      {
        title: "Psychometry",
        description: "",
        tests: ["Psychometry","Counselling","I.Q Testing","Learning Disability Test","Neuro-psychological assessment","Personality Testing, etc."],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626495966_emg.jpg",
      },
    ],
  },
  {
    id: "ent",
    name: "ENT",
    icon: "👂",
    sourceTitle: "E.N.T. DEPARTMENT",
    intro: "E.N.T procedures available are:",
    branchIds: ["kolkata","malda","balurghat","gangarampur"],
    sections: [
      {
        title: "ENT",
        description: "",
        tests: ["Pure Tone Audiometry","Tympanometry","B.E.R.A","Laryngoscopy","Ear Endoscopy","Nasal Endoscopy"],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626696406_kol ent.jpg",
      },
    ],
  },
  {
    id: "gastroenterology",
    name: "Gastroenterology",
    icon: "🫁",
    sourceTitle: "GASTROENTEROLOGY DEPARTMENT",
    intro: "The Gastroenterology department, under the supervision of qualified Gastroenterologist carry out procedures like :",
    branchIds: ["kolkata","malda","balurghat","gangarampur"],
    sections: [
      {
        title: "GASTROENTEROLOGY",
        description: "",
        tests: ["Upper G.I. Endoscopy","Colonoscopy","Rapid Urease Test for H.Pylori","Endoscopic Biopsy","Sigmoidscopy"],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626496069_ENDOSCOPY.jpg",
      },
    ],
  },
  {
    id: "urology",
    name: "Urology",
    icon: "💧",
    sourceTitle: "UROLOGY DEPARTMENT",
    intro: "Available Urology procedure :",
    branchIds: ["kolkata","malda","balurghat","gangarampur"],
    sections: [
      {
        title: "UROLOGY",
        description: "",
        tests: ["Uroflowmetry"],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626496161_urology.jpg",
      },
    ],
  },
  {
    id: "dental",
    name: "Dental",
    icon: "🦷",
    sourceTitle: "Sate of the art Dental Clinic",
    intro: "At SONOSCAN, dentistry goes beyond treatment - it's about comfort, precision, and lasting confidence. Our state-of-the-art Dental Unit in KOLKATA combines advanced technology, experienced specialists, and patient-friendly care to deliver world-class oral health solutions under one roof. Smile brighter; live healthier - with SONOSCAN Dental Unit, your oral health is in trusted hands.",
    branchIds: ["kolkata","malda","gangarampur"],
    sections: [
      {
        title: "Why Choose Us?",
        description: "",
        tests: ["Digital OPG X-Ray for panoramic and precise imaging.","Comprehensive Services - preventive, restorative, cosmetic, orthodontic, prosthetic, and emergency care.","Emergency & Pain Relief - quick relief from toothaches, infections, and fractures with expert intervention.","Cosmetic & Smile Design - whitening, veneers, tooth & gum contouring, braces, aligners, and digital smile makeovers.","Counseling & Care Plans - personalized guidance on diet, hygiene, and long-term oral health strategies."],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1756542834_dental-cabinet-with-various-medical-equipment (1).jpg",
      },
      {
        title: "Our Services at a Glance",
        description: "",
        tests: ["Preventive Care: Regular check-ups, scaling, fluoride therapy.","Restorative Dentistry: Fillings, root canal treatment, crowns & bridges.","Implants & Prosthetics: Safe, lasting replacements for missing teeth.","Orthodontics: Braces & aligners for all ages.","Cosmetic Dentistry: Whitening, veneers, smile design, gum & tooth contouring.","Emergency Care: Immediate pain relief & urgent dental treatment."],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1756542921_man-is-wearing-gloves-that-say-dentists-are-cutting-piece-food (1).jpg",
      },
    ],
  },
  {
    id: "skin",
    name: "Skin & Aesthetics",
    icon: "🧴",
    sourceTitle: "Skin & Aesthetic Clinic",
    intro: "At SONOSCAN, we believe skin health is not just about beauty - it's about science, safety, and long-term well-being. Our Skin & Aesthetic Unit is led by experienced dermatologists who combine medical expertise with advanced technology to deliver care that goes far beyond ordinary salons or beauty clinics. Because your skin deserves more than beauty - it deserves expert care.",
    branchIds: ["kolkata"],
    sections: [
      {
        title: "Our Promise",
        description: "",
        tests: ["At SONOSCAN, every patient receives a personalized skin and aesthetic care plan backed by medical science. Whether it's restoring skin health, managing chronic conditions, or enhancing natural beauty, we focus on treatments that are safe, effective, and clinically proven."],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1756544497_AESTHETICROOMVIEW1.jpg",
      },
      {
        title: "Why Choose Us?",
        description: "",
        tests: ["Prescription-based treatments designed and monitored by qualified dermatologists.","Need-based clinical procedures such as acne therapy, scar revision, pigmentation correction, anti-aging solutions, and vitiligo surgery all performed under strict medical supervision","Treatment for skin diseases including eczema, psoriasis, fungal infections, and allergic conditions.","Hair restoration,Nail Restoration and medical facials using globally approved technology.","Safety, hygiene, and evidence-based results with every procedure following international medical standards."],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1756544309_woman-medical-uniform-with-nurse-background (1).jpg",
      },
      {
        title: "Our Services at a Glance",
        description: "",
        tests: ["All type of Face Treatment","Nail Surgery","Hair Treatment","All Type of Dermato Surgery","Vitiligo Surgery","Electro Surgery"],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1756545599_radiant-woman-spa-robe-enjoying-relaxing-tranquility-white-background (1).jpg",
      },
    ],
  },
  {
    id: "others",
    name: "Other Tests",
    icon: "🧪",
    sourceTitle: "OTHER TESTS",
    intro: "Apart from these regular procedures, other tests that are performed here are :",
    branchIds: ["kolkata","malda","balurghat","gangarampur"],
    sections: [
      {
        title: "OTHERS",
        description: "",
        tests: ["Lung Function Test","Carotid Doppler Study","Peripheral Vascular Study"],
        img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626697329_kol others.jpg",
      },
    ],
  },
]
