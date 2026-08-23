// ──────────────────────────────────────────────
// Branch-wise diagnostic department content — sourced from
// https://www.sonoscanhealthcare.net/sono/services.php?d=<DEPT>&c=<Branch>
// Each department runs its own page per branch, and the content
// (section titles, tests, images) differs between branches.
// Keyed: branchId -> deptId -> content.
// ──────────────────────────────────────────────

export interface DiagnosticBranchSection {
  title: string
  description: string
  tests: string[]
  img: string
}

export interface DiagnosticBranchDepartment {
  sourceTitle: string
  intro: string
  sections: DiagnosticBranchSection[]
}

export const diagnosticBranchDepartments: Record<string, Record<string, DiagnosticBranchDepartment>> = {
  "kolkata": {
    "pathology": {
      sourceTitle: "NABL ACCREDITED PATHOLOGY DEPARTMENT",
      intro: "SONOSCAN under takes a wide range of Pathological Examinations in a NABL Accredited state-of-the art Laboratory under the supervision of qualified experienced Pathologists and technical staff. In order to maintain high Laboratory standard, Internal & External Quality Control are performed regularly . We have bar-coded sample identification and computer interfacing systems for report generation in our laboratory.",
      sections: [
        { title: "HAEMATOLOGY", description: "Wide range of routine as well as special tests done Offers a wide array of screening, diagnostic, prognostic and monitoring tests for hematopoietic diseases. Services include comprehensive testing for thrombotic and bleeding disorders. Introduced gel technology for blood grouping.", tests: ["Wide range of routine as well as special tests done","Offers a wide array of screening, diagnostic, prognostic and monitoring tests for hematopoietic diseases.","Services include comprehensive testing for thrombotic and bleeding disorders.","Introduced gel technology for blood grouping."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1743667983_1626773925_9.jpg" },
        { title: "BIOCHEMISTRY & SEROLOGY", description: "Well-equipped department providing routine and special diagnostic as well as screening services. With all state-of-the-art fully automated high throughput instruments employing spectrophotometric, turbidimetric, electro chemiluminiscent and ELISA techniques. HPLC technique for estimation of HbA1c as well as for screening of haemoglobinopathies. Reporting of HbA1c in dual units(NGSP and IFCC) The fetal risk assessment menu is designed to aid the clinician identify, manage, and follow up high-risk and/or complicated pregnancies. Maternal serum screening (Triple Test) is used to detect cases of neural tube defects, trisomy 18, and trisomy 21 (Down syndrome). Analyses are performed by a dedicated team of laboratory technicians. Same day reporting for majority of tests.", tests: ["Routine and special Biochemical parameters, Hormone assay, Specially Lactate, Ammonia, D.Dimer, IL6, C3, C4, Ceruloplasmin, ACL, Lupas Anticoagulent, APLA Profile, Special Maternal Marker – Double Marker, Triple Marker, Quadruple Marker & Others."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626431145_cobas6000.jpg" },
        { title: "IMMUNOLOGY", description: "", tests: ["Wide range of routine as well as special tests done","TORCH Panel, Hepatitis Panel, Autoimmune Panel, Hepatitis-B Profile, Liver Panel (AMA, LKM Antibody, LC-1, SLA/LP), ANA, DSDNA, ANA Profile by Immunofluorescence technology, ANCA (C+P) etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1642000441_PIC-8.jpg" },
        { title: "MOLECULAR BIOLOGY", description: "Wide range of routine as well as special tests done", tests: ["TBPCR (genxpert), HLA B27 PCR, BCR ABL PCR, Hepatities-B viral load DNA PCR, HIV RNA PCR, HCV RNA PCR etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1642000527_PIC-3.jpg" },
        { title: "MICROBIOLOGY", description: "Entire panel of routine as well as special tests done. Well-equipped analytical expertise in all areas of microbiology including antimicrobial susceptibility testing, bacteriology, mycobacteriology, mycology, parasitology, and virology. Range of testing from routine bacterial cultures and serological assays to the latest in molecular-based techniques, such as real-time qualitative and quantitative PCR & GeneXpert technology Serological section performs various antigen and antibody testing and confirmation for infectious diseases. Immunofluorescence tests for autoimmune markers.", tests: ["Automated Aerobic and Anaerobic culture, automated microbial identification and antibiotic susceptibility test. Mycobacterial culture, fungal Culture, Blood Culture and others."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626450781_micro.jpg" },
        { title: "HISTOPATHOLOGY, CYTOPATHOLOGY, FNAC & BONE MARROW STUDY", description: "LIQUID BASED CYTOLOGY (LBC) is a relatively new technology intended to improve detection of cytological abnormalities and considered as a new, efficacious and highly sensitive way of cervical screening and detection of malignant cell in fluid specimen. Cell block preparation from fluid specimens and examination are routinely done for enhanced detection of malignant cells. Routine diagnostic histopathology service aided by various types of special stains. Reporting of malignant-tumours according to College of American Pathologist (CAP) Protocol.", tests: ["Direct USG & CT guided FNAC, PAP Staining of gynaecological smear & Imprint smear. Body fluid & Bal fluid cytology. Brush cytology, Urine Cytology. Different types of biopsies and Cell Block."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626696206_histo kol.jpg" },
        { title: "CLINICAL PATHOLOGY", description: "Wide array of tests available for blood, urine, CSF and other body fluid & Same day Reporting", tests: ["Routine & Special tests of Urine, Stool, Semen & Body Fluids etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626450602_cli.jpg" },
        { title: "SPECIAL PARAMETERS", description: "Wide range of routine as well as special tests done", tests: ["Tumour Marker, CA 125, AFP, CA 15-3, CA 19.9, CEA, Beta 2 Microglobulin."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1642000600_PIC-9.jpg" },
      ],
    },
    "radiology": {
      sourceTitle: "RADIOLOGY & IMAGING DEPARTMENT",
      intro: "The Department of Radiology & Imaging at SONOSCAN Kolkata is equipped with the most advanced instruments of international standard and backed by a team of highly qualified and skilled radiologists to further enhance its range of conventional and interventional radiological procedures.",
      sections: [
        { title: "3 TESLA SILENT MRI", description: "", tests: ["Quiet Suite.","Dedicated Shoulder, Knee & Breast coils.","Cardiac MRI – Viability & Morphology Study Done.","Diffusion Tensor Imaging.","Head, Neck & Renal Angiography without contrast.","Brain, Spine, Head & Neck, Chest, Abdomen, Musculoskeletal, Angiography, MRCP, MR Spectroscopy, Dynamic Scan, Fistulogram and others"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626451878_MRI.jpg" },
        { title: "384 SLICE CT SCAN", description: "", tests: ["Ultra Low Dose CT Scanner- Least Radiation Dose to Patient.","Cardiac Scanning ( Coronary Angiography) Non invasive cardiac scanning for detection of Cardiac diseases in a few seconds with minimal radiation dose and excellent image detail even at low radiation doses.","High Detector Coverage- Very Fast Scanning, helps to scan patients with less breath holding capacity.","High Resolution Scanner- More diagnostic information than conventional CT scanner for most accurate diagnosis.","Peripheral Angiography Diagnosis of vascular diseases including cases which cannot be detected by conventional CT scanner.","Brain, Spine, Head & Neck, Chest, Abdomen, Great Vessels, Cerebral, Carotid, Renal, Peripheral Angiography, Cardiac C.T. Angiography etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626452050_ct sCAN.jpg" },
        { title: "DR SYSTEM X-RAY", description: "Powered by completely digital equipments, the Direct Radiography wing covers Routine & Special X-Ray .", tests: ["Routine X-Ray, Ba-Meal & Ba-Swallow, I.V.U, M.C.U, Ascending Urethrogram, Sinogram, HSG and others."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626452108_DR.jpg" },
        { title: "Mammography", description: "", tests: ["Improved Images.","High Level of diagnostic Accuracy.","Very Negligble radiation."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1719925477_MAMMOGRAPHY.jpg" },
        { title: "Bone Mineral Density", description: "", tests: ["64 Detector System.","High Resolution Image.","Very Quick Procedure time (30 seconds).","Greater Long term precision"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1691587296_BMD PIC.jpg" },
        { title: "Digital OPG & Cephalometry", description: "", tests: ["High Quality Images.","Simple & Fast Operation.","Powered by CS Imaging Version B.","A New Level of Sharpness"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1691587991_OPG.jpg" },
        { title: "HIGH END 4D ULTRASONOGRAPHY & COLOUR DOPPLER", description: "Engineered for efficiency and reliability, and powered by international standard equipments which provide outstanding image quality, advanced features, and improved usability.", tests: ["Abdominal, Obstetrics and Gynaecological, Foetal Anomaly, Small Parts, Joints, Soft Tissues, Trans Vaginal, Trans Rectal & Image Guided procedures etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626452184_USG.jpg" },
      ],
    },
    "cardiology": {
      sourceTitle: "CARDIOLOGY DEPARTMENT",
      intro: "The Cardiology department is designed with sophisticated, non-invasive diagnostic modules acquired from internationally reputed manufacturers. Various cardiac procedures like,",
      sections: [
        { title: "CARDIOLOGY", description: "", tests: ["Digital ECG.","Echocardiography & Colour Doppler","Foetal Echocardiography","Paediatric Echocardiography","Tread Mill Test (TMT)","Holter Monitoring","24 hour Blood Pressure Recording"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626452367_TMT.jpg" },
      ],
    },
    "neurology": {
      sourceTitle: "NEUROLOGY DEPARTMENT",
      intro: "With the rise of incidences of neurological disorders across the world, SONOSCAN, under the supervision of experienced neurologists, has introduced a wide range of non-invasive diagnostic tests like:",
      sections: [
        { title: "NEUROLOGY", description: "", tests: ["Digital EEG","EMG","NCV","VEP","BERA and SSEP"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626495788_EEG.jpg" },
        { title: "Psychometry", description: "", tests: ["Psychometry","Counselling","I.Q Testing","Learning Disability Test","Neuro-psychological assessment","Personality Testing, etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626495966_emg.jpg" },
      ],
    },
    "ent": {
      sourceTitle: "E.N.T. DEPARTMENT",
      intro: "E.N.T procedures available are:",
      sections: [
        { title: "ENT", description: "", tests: ["Pure Tone Audiometry","Tympanometry","B.E.R.A","Laryngoscopy","Ear Endoscopy","Nasal Endoscopy"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626696406_kol ent.jpg" },
      ],
    },
    "gastroenterology": {
      sourceTitle: "GASTROENTEROLOGY DEPARTMENT",
      intro: "The Gastroenterology department, under the supervision of qualified Gastroenterologist carry out procedures like :",
      sections: [
        { title: "GASTROENTEROLOGY", description: "", tests: ["Upper G.I. Endoscopy","Colonoscopy","Rapid Urease Test for H.Pylori","Endoscopic Biopsy","Sigmoidscopy"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626496069_ENDOSCOPY.jpg" },
      ],
    },
    "urology": {
      sourceTitle: "UROLOGY DEPARTMENT",
      intro: "Available Urology procedure :",
      sections: [
        { title: "UROLOGY", description: "", tests: ["Uroflowmetry"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626496161_urology.jpg" },
      ],
    },
    "dental": {
      sourceTitle: "Sate of the art Dental Clinic",
      intro: "At SONOSCAN, dentistry goes beyond treatment - it's about comfort, precision, and lasting confidence. Our state-of-the-art Dental Unit in KOLKATA combines advanced technology, experienced specialists, and patient-friendly care to deliver world-class oral health solutions under one roof. Smile brighter; live healthier - with SONOSCAN Dental Unit, your oral health is in trusted hands.",
      sections: [
        { title: "Why Choose Us?", description: "", tests: ["Digital OPG X-Ray for panoramic and precise imaging.","Comprehensive Services - preventive, restorative, cosmetic, orthodontic, prosthetic, and emergency care.","Emergency & Pain Relief - quick relief from toothaches, infections, and fractures with expert intervention.","Cosmetic & Smile Design - whitening, veneers, tooth & gum contouring, braces, aligners, and digital smile makeovers.","Counseling & Care Plans - personalized guidance on diet, hygiene, and long-term oral health strategies."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1756542834_dental-cabinet-with-various-medical-equipment (1).jpg" },
        { title: "Our Services at a Glance", description: "Preventive Care: Regular check-ups, scaling, fluoride therapy.", tests: ["Restorative Dentistry: Fillings, root canal treatment, crowns & bridges.","Implants & Prosthetics: Safe, lasting replacements for missing teeth.","Orthodontics: Braces & aligners for all ages.","Cosmetic Dentistry: Whitening, veneers, smile design, gum & tooth contouring.","Emergency Care: Immediate pain relief & urgent dental treatment."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1756542921_man-is-wearing-gloves-that-say-dentists-are-cutting-piece-food (1).jpg" },
      ],
    },
    "skin": {
      sourceTitle: "Skin & Aesthetic Clinic",
      intro: "At SONOSCAN, we believe skin health is not just about beauty - it's about science, safety, and long-term well-being. Our Skin & Aesthetic Unit is led by experienced dermatologists who combine medical expertise with advanced technology to deliver care that goes far beyond ordinary salons or beauty clinics. Because your skin deserves more than beauty - it deserves expert care.",
      sections: [
        { title: "Our Promise", description: "", tests: ["At SONOSCAN, every patient receives a personalized skin and aesthetic care plan backed by medical science. Whether it's restoring skin health, managing chronic conditions, or enhancing natural beauty, we focus on treatments that are safe, effective, and clinically proven."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1756544497_AESTHETICROOMVIEW1.jpg" },
        { title: "Why Choose Us?", description: "Prescription-based treatments designed and monitored by qualified dermatologists.", tests: ["Need-based clinical procedures such as acne therapy, scar revision, pigmentation correction, anti-aging solutions, and vitiligo surgery all performed under strict medical supervision","Treatment for skin diseases including eczema, psoriasis, fungal infections, and allergic conditions.","Hair restoration,Nail Restoration and medical facials using globally approved technology.","Safety, hygiene, and evidence-based results with every procedure following international medical standards."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1756544309_woman-medical-uniform-with-nurse-background (1).jpg" },
        { title: "Our Services at a Glance", description: "", tests: ["All type of Face Treatment","Nail Surgery","Hair Treatment","All Type of Dermato Surgery","Vitiligo Surgery","Electro Surgery"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1756545599_radiant-woman-spa-robe-enjoying-relaxing-tranquility-white-background (1).jpg" },
      ],
    },
    "others": {
      sourceTitle: "OTHER TESTS",
      intro: "Apart from these regular procedures, other tests that are performed here are :",
      sections: [
        { title: "OTHERS", description: "", tests: ["Lung Function Test","Carotid Doppler Study","Peripheral Vascular Study"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626697329_kol others.jpg" },
      ],
    },
  },
  "malda": {
    "pathology": {
      sourceTitle: "NABL ACCREDITED PATHOLOGY DEPARTMENT",
      intro: "SONOSCAN under takes a wide range of Pathological Examinations in a NABL Accredited state-of-the art Laboratory under the supervision of qualified experienced Pathologists and technical staff. In order to maintain high Laboratory standard, Internal & External Quality Control are performed regularly . We have bar-coded sample identification and computer interfacing systems for report generation in our laboratory.",
      sections: [
        { title: "HAEMATOLOGY", description: "Wide range of routine as well as special tests done Offers a wide array of screening, diagnostic, prognostic and monitoring tests for hematopoietic diseases. Services include comprehensive testing for thrombotic and bleeding disorders.", tests: ["Wide range of routine as well as special tests done","Offers a wide array of screening, diagnostic, prognostic and monitoring tests for hematopoietic diseases.","Services include comprehensive testing for thrombotic and bleeding disorders.","Introduced gel technology for blood grouping."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1743668079_1626773925_9.jpg" },
        { title: "BIOCHEMISTRY & SEROLOGY", description: "Well-equipped department providing routine and special diagnostic as well as screening services.With all state-of-the-art fully automated high throughput instruments employing spectrophotometric, turbidimetric, electro chemiluminiscent and ELISA techniques. HPLC technique for estimation of HbA1c. Reporting of HbA1c in dual units (NGSP and IFCC) The fetal risk assessment menu is designed to aid the clinician identify, manage, and follow up high-risk and/or complicated pregnancies. Maternal serum screening (Triple Test) is used to detect cases of neural tube defects, trisomy 18, and trisomy 21 (Down syndrome). Analyses are performed by a dedicated team of laboratory technicians. Same day reporting for majority of tests.", tests: ["Routine and special Biochemical parameters, Hormone assay, Specially Lactate, Ammonia, D.Dimer, IL6, C3, C4, Ceruloplasmin, ACL, Lupas Anticoagulent, APLA Profile, Special Maternal Marker – Double Marker, Triple Marker, Quadruple Marker & Others."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626528060_MLD PA -2.jpg" },
        { title: "IMMUNOLOGY", description: "Wide range of routine as well as special tests done", tests: ["TORCH Panel, Hepatitis Panel, Autoimmune Panel, Hepatitis-B Profile, Liver Panel (AMA, LKM Antibody, LC-1, SLA/LP), ANA, DSDNA, ANA Profile by Immunofluorescence technology, ANCA (C+P) etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1642000702_ARKITEC-1.jpg" },
        { title: "MICROBIOLOGY", description: "Entire panel of routine as well as special tests done. Well-equipped analytical expertise in all areas of microbiology including antimicrobial susceptibility testing, bacteriology, mycobacteriology, mycology, parasitology, and virology. Range of testing from routine bacterial cultures and serological assays to the latest in molecular-based techniques, such as real-time qualitative and quantitative PCR & GeneXpert technology IImmunofluorescence tests for autoimmune markers.", tests: ["EAutomated Aerobic and Anaerobic culture, automated microbial identification and antibiotic susceptibility test. Mycobacterial culture, fungal Culture, Blood Culture and others."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626528529_MLD PATH-3.jpg" },
        { title: "MOLECULAR BIOLOGY", description: "Wide range of routine as well as special tests done", tests: ["COVID-19 RTPCR, TBPCR (genxpert), HLA B27 PCR, BCR ABL PCR, Hepatities-B viral load DNA PCR, HIV RNA PCR, HCV RNA PCR etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1642000779_PIC-3.jpg" },
        { title: "HISTOPATHOLOGY, CYTOPATHOLOGY, FNAC & BONE MARROW STUDY", description: "LIQUID BASED CYTOLOGY (LBC) is a relatively new technology intended to improve detection of cytological abnormalities and considered as a new, efficacious and highly sensitive way of cervical screening and detection of malignant cell in fluid specimen. Cell block preparation from fluid specimens and examination are routinely done for enhanced detection of malignant cells. Routine diagnostic histopathology service aided by various types of special stains. Reporting of malignant-tumours according to College of American Pathologist (CAP) Protocol.", tests: ["Direct USG & CT guided FNAC, PAP Staining of gynaecological smear & Imprint smear. Body fluid & Bal fluid cytology. Brush cytology, Urine Cytology. Different types of biopsies and Cell Block"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626528779_his mld.jpg" },
        { title: "CLINICAL PATHOLOGY", description: "Wide array of tests available for blood, urine, CSF and other body fluids. Same day reporting", tests: ["Routine & Special tests of Urine, Stool, Semen & Body Fluids etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626528318_cli.jpg" },
        { title: "SPECIAL PARAMETERS", description: "Wide range of routine as well as special tests done", tests: ["Tumour Marker, CA 125, AFP, CA 15-3, CA 19.9, CEA, Beta 2 Microglobulin."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1642000854_PIC-9.jpg" },
      ],
    },
    "radiology": {
      sourceTitle: "RADIOLOGY & IMAGING DEPARTMENT",
      intro: "The Department of Radiology & Imaging is equipped with the most sophisticated advanced instruments of International class. A team of qualified, skilled Radiologists is attached with this department to perform various types of conventional and interventional radiological procedures.Different procedures of Radiology & Imaging Department.",
      sections: [
        { title: "1.5 TESLA SILENT MRI", description: "", tests: ["The super most imaging modality.","Offers multiplanar acquisition & enhanced contrast resolution.","Useful for whole body imaging, particularly in case of Spinal problems, joint pathology, Cerebral stroke, etc. Biliary obstruction & detection of different types of congenital anomalies, etc.","IAdvantage of M.R. Angiography & M.R.C.P.","Useful for detection of some lesions, where C.T. Scan may not reveal any pathology.","No harmful effect of ionising radiation, hence suitable for imaging during child bearing age, pregnancy and paediatric patients.","Brain, Spine, Head & Neck, Chest, Abdomen, Musculoskeletal, Angiography, MRCP, MR Spectroscopy, Dynamic Scan, Fistulagram and Others."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626496545_MR MLD.jpg" },
        { title: "384 SLICE CT SCAN", description: "1st time in this part of Bengal Possibilities of Heart Attack can be diagnosed safely by Cardiac CT Angiography 384 Slice AI based CT Scan Machine.", tests: ["Biphasic /Triphasic C.T. Scan of Abdomen (Liver & Pancreas) for detection of very small neoplasm and better characterization of lesion, non-invasively.","High quality C.T. Angiography of Renal artery, Pulmonary vessels, Aorta, Carotid arch , Intra- cerebral Circulation) and Peripheral vessels (upper & Lower limbs).","Improved quality C.T. Urography and full Spine 3D & 2D reconstruction examination particularly in trauma patients.","Barin, Spine, Head & Neck, Chest, Abdomen, Great Vessells, Cerebral, Carotid, Renal, Peripheral Angiography etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626496635_CT MLD.jpg" },
        { title: "Bone Mineral Density", description: "", tests: ["64 Detector System.","High Resolution Image.","Very Quick Procedure time (30 seconds).","Greater Long term precision"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1719926140_bmd.jpg" },
        { title: "HIGH END 4D ULTRASONOGRAPHY & 4D COLOUR DOPPLER", description: "Engineered for efficiency and reliability, and powered by international standard equipments which provide outstanding image quality, advanced features, and improved usability.", tests: ["Abdominal, Obstetrics & Gynaecological, Foetal Anomaly, Small Parts, Joints, Soft Tissu, Trans Vaginal, Trans Rectal & Image Guided Procedures etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626496864_USG.jpg" },
        { title: "Mammography", description: "", tests: ["Improved Images.","High Level of diagnostic Accuracy.","Very Negligble radiation."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1719925697_MAMMOGRAPHY.jpg" },
        { title: "DR SYSTEM X-RAY", description: "Powered by completely digital equipments, the Direct Radiography wing covers Routine & Special X-Ray.", tests: ["Routine X-Ray, Ba-Meal & Ba-Swallow, I.V.U, M.C.U, Ascending Urethrogram, Sinogram, HSG and others."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626496737_dr mld.jpg" },
      ],
    },
    "cardiology": {
      sourceTitle: "CARDIOLOGY DEPARTMENT",
      intro: "The Cardiology department is designed with sophisticated, non-invasive diagnostic modules acquired from internationally reputed manufacturers. Various cardiac procedures like,",
      sections: [
        { title: "CARDIOLOGY", description: "", tests: ["Digital ECG","Echocardiography & Colour Doppler","Feotal Echocardiography","Paediatric Echocardiography","Tread Mill Test (TMT)","Holter Monitoring","24 hour BP recording"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626497041_car-mld.jpg" },
      ],
    },
    "neurology": {
      sourceTitle: "NEUROLOGY DEPARTMENT",
      intro: "With the rise of incidences of neurological disorders across the world, Sonoscan, under the supervision of experienced neurologists, has introduced a wide range of non-invasive diagnostic tests like:",
      sections: [
        { title: "NEUROLOGY", description: "", tests: ["Digital EEG","EMG","NCV","VEP","BERA and SSEP","OAE"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626696661_mld neuro.jpg" },
      ],
    },
    "ent": {
      sourceTitle: "E.N.T. DEPARTMENT",
      intro: "E.N.T procedures available are:",
      sections: [
        { title: "ENT", description: "", tests: ["Pure tone Audiometry","Tympanometry","B.E.R.A","O.A.E.","Laryngoscopy","Ear endoscopy","Nasal endoscopy","A.B.L.B, S.D.S & S.I.S.I","T.D.I & T.R.T"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626497221_ADM.jpg" },
      ],
    },
    "gastroenterology": {
      sourceTitle: "GASTROENTEROLOGY DEPARTMENT",
      intro: "The Gastroenterology department, under the supervision of qualified Gastroenterologists carries out procedures like",
      sections: [
        { title: "GASTROENTEROLOGY", description: "", tests: ["Upper GI endoscopy","Colonoscopy","Sigmoidscopy"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626497352_ENDOSCOPY.jpg" },
      ],
    },
    "urology": {
      sourceTitle: "UROLOGY DEPARTMENT",
      intro: "Available Urology procedure",
      sections: [
        { title: "UROLOGY", description: "", tests: ["Uroflowmetry"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626497527_urology.jpg" },
      ],
    },
    "dental": {
      sourceTitle: "Sate of the art Dental Clinic",
      intro: "At SONOSCAN, dentistry goes beyond treatment - it's about comfort, precision, and lasting confidence. Our state-of-the-art Dental Unit in MALDA combines advanced technology, experienced specialists, and patient-friendly care to deliver world-class oral health solutions under one roof. Smile brighter; live healthier - with SONOSCAN Dental Unit, your oral health is in trusted hands.",
      sections: [
        { title: "Why Choose Us?", description: "", tests: ["Digital OPG X-Ray for panoramic and precise imaging.","Comprehensive Services - preventive, restorative, cosmetic, orthodontic, prosthetic, and emergency care.","Emergency & Pain Relief - quick relief from toothaches, infections, and fractures with expert intervention.","Cosmetic & Smile Design - whitening, veneers, tooth & gum contouring, braces, aligners, and digital smile makeovers.","Counseling & Care Plans - personalized guidance on diet, hygiene, and long-term oral health strategies."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1756540654_empty-modern-teethcare-stomatology-hospital-office-with-nobody-it-equipped-with-dental-intruments-ready-orthodontist-healthcare-treatment-tooth-radiography-images-display-min.jpg" },
        { title: "Our Services at a Glance", description: "Preventive Care: Regular check-ups, scaling, fluoride therapy.", tests: ["Restorative Dentistry: Fillings, root canal treatment, crowns & bridges.","Implants & Prosthetics: Safe, lasting replacements for missing teeth.","Orthodontics: Braces & aligners for all ages.","Cosmetic Dentistry: Whitening, veneers, smile design, gum & tooth contouring.","Emergency Care: Immediate pain relief & urgent dental treatment."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1756541425_close-up-dentist-examining-boy-min.jpg" },
      ],
    },
    "others": {
      sourceTitle: "OTHER TESTS",
      intro: "Apart from these regular procedures, other tests that are performed here are :",
      sections: [
        { title: "OTHERS", description: "", tests: ["Lung Function Test with","Carotid Doppler Study","Peripheral Vascular Study","Physiotherapy"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626498156_PFT.jpg" },
        { title: "Clinical Psychology Test (Psychometry)", description: "", tests: ["Clinical Psychology Test (Psychometry)","Counselling","I.Q Testing","Learning Disability Test","Neuro-psychological assessment","Personality Testing, etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1748174490_1626696962_neu-mld 1.jpg" },
      ],
    },
  },
  "balurghat": {
    "pathology": {
      sourceTitle: "NABL ACCREDITED PATHOLOGY DEPARTMENT1",
      intro: "NABL ACCREDITED PATHOLOGY DEPARTMENT1",
      sections: [
        { title: "HAEMATOLOGY", description: "Entire panel of routine as well as special tests done Offers a wide array of screening, diagnostic, prognostic and monitoring tests for hematopoietic diseases. Services include comprehensive testing for thrombotic disorders.", tests: ["Wide range of routine as well as special tests done","Offers a wide array of screening, diagnostic, prognostic and monitoring tests for hematopoietic diseases.","Services include comprehensive testing for thrombotic and bleeding disorders.","Introduced gel technology for blood grouping."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1743668160_1626773925_9.jpg" },
        { title: "BIOCHEMISTRY & SEROLOGY", description: "Well-equipped department providing routine and special diagnostic as well as screening services. With all state-of-the-art fully automated high throughput instruments employing spectrophotometric, turbidimetric, electro chemiluminiscent and ELISA techniques. HPLC technique for estimation of HbA1c as well as for screening of haemoglobinopathies. Reporting of HbA1c in dual units(NGSP and IFCC) The fetal risk assessment menu is designed to aid the clinician identify, manage, and follow up high-risk and/or complicated pregnancies. Maternal serum screening (Triple Test) is used to detect cases of neural tube defects, trisomy 18, and trisomy 21 (Down syndrome). Analyses are performed by a dedicated team of laboratory technicians. Same day reporting for majority tests.", tests: ["Routine and special Biochemical parameters, Hormone assay, Specially Lactate, Ammonia, D.Dimer, IL6, C3, C4, Ceruloplasmin, ACL, Lupas Anticoagulent, APLA Profile, Special Maternal Marker – Double Marker, Triple Marker, Quadruple Marker & Others."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626784453_blg path-3.jpg" },
        { title: "IMMUNOLOGY", description: "Wide range of routine as well as special tests done", tests: ["TORCH Panel, Hepatitis Panel, Autoimmune Panel, Hepatitis-B Profile, Liver Panel (AMA, LKM Antibody, LC-1, SLA/LP), ANA, DSDNA, ANA Profile by Immunofluorescence technology, ANCA (C+P) etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1641999969_PIC-8.jpg" },
        { title: "MOLECULAR BIOLOGY", description: "Wide range of routine as well as special tests done", tests: ["TBPCR (genxpert), HLA B27 PCR, BCR ABL PCR, Hepatities-B viral load DNA PCR, HIV RNA PCR, HCV RNA PCR etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1642000324_PIC-3.jpg" },
        { title: "HISTOPATHOLOGY, CYTOPATHOLOGY, FNAC & BONE MARROW STUDY", description: "LIQUID BASED CYTOLOGY (LBC) is a relatively new technology intended to improve detection of cytological abnormalities and considered as a new, efficacious and highly sensitive way of cervical screening and detection of malignant cell in fluid specimen. Cell block preparation from fluid specimens and examination are routinely done for enhanced detection of malignant cells. Routine screening and diagnostic cytopathology and histopathology services, including gynecologic and nongynecologic specimens including pulmonary and bronchoalveolar lavage, gastrointestinal, body cavity fluid, cerebrospinal fluid, urologic, fine needle aspiration, nipple secretions, oral cytology, and ophthalmologic cytology.", tests: ["Direct USG & CT guided FNAC, PAP Staining of gynaecological smear & Imprint smear. Body fluid & Bal fluid cytology. Brush cytology, Urine Cytology. Different types of biopsies and Cell Block."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626784617_histo-blg.jpg" },
        { title: "CLINICAL PATHOLOGY", description: "Wide array of tests available for blood, urine, CSF and other body fluids. Same day reporting for majority of tests.", tests: ["Routine & Special tests of Urine, Stool, Semen & Body Fluids etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626784564_BLG PATH-2.jpg" },
        { title: "SPECIAL PARAMETRS", description: "Wide range of routine as well as special tests done", tests: ["Tumour Marker, CA 125, AFP, CA 15-3, CA 19.9, CEA, Beta 2 Microglobulin"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1642000075_PIC-9.jpg" },
      ],
    },
    "radiology": {
      sourceTitle: "RADIOLOGY DEPARTMENT",
      intro: "The Department of Radiology & Imaging enriched with most sophisticated advanced instruments of International class. A team of qualified skilled Radiologists is attached with this department to perform various types of conventional and interventional radiological procedures. Different procedures of Radiology & Imaging Department",
      sections: [
        { title: "MULTI SLICE C.T. SCAN", description: "", tests: ["96 Slice C.T. Scan first time in Balurghat.","Faster scan with thinner section (0.6) which provides low radiation with high resolution and easy to perform for the restless patient with better diagnosis.","Brain, Spine, Head & Neck, Chest, Abdomen, Great Vessels etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626529513_ct blg.jpg" },
        { title: "HIGH END 4D ULTRASONOGRAPHY & COLOUR DOPPLER", description: "Engineered for efficiency and reliability, and powered by international standard equipments which provide outstanding image quality, advanced features, and improved usability.", tests: ["Abdominal, Obstetrics & Gynaecological, Foetal Anomaly, Small Parts, Joints, Soft Tissue, Trans Vaginal, Trans Rectal & Image Guided Procedures etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626530010_usg blg.jpg" },
        { title: "DIGITAL X-RAY", description: "In 500 X-Ray, powerful picture tube executes more tissue penetration and producespicture-009 better image with minimum radiation hazard.", tests: ["Digital X-Ray is an improved version over conventional Radiography. Unmatched image quality.","Lesions liable to be missed on conventional X-Ray are likely to be detected on Digital X-Ray.","Routine and Special X-Ray"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626529678_XRAY BLG.jpg" },
      ],
    },
    "cardiology": {
      sourceTitle: "CARDIOLOGY DEPARTMENT",
      intro: "The Cardiology department is designed with sophisticated, non-invasive diagnostic modules acquired from internationally reputed manufacturers. Various cardiac procedures like,",
      sections: [
        { title: "CARDIOLOGY", description: "", tests: ["Digital ECG","Echocardiography & Colour Doppler","Feotal Echocardiography","Paediatric Echocardiography","Tread Mill Test (TMT)","Holter Monitoring"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626530479_tmt blg.jpg" },
      ],
    },
    "neurology": {
      sourceTitle: "NEUROLOGY DEPARTMENT",
      intro: "With the rise of incidences of neurological disorders across the world, Sonoscan, under the supervision of experienced neurologists, has introduced a wide range of non-invasive diagnostic tests like:",
      sections: [
        { title: "NEUROLOGY", description: "", tests: ["Digital EEG","B.E.R.A"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626533058_EEG.jpg" },
      ],
    },
    "ent": {
      sourceTitle: "E.N.T. SERVICES",
      intro: "",
      sections: [
        { title: "Pure tone Audiometry", description: "", tests: ["Pure tone Audiometry","Tympanometry","B.E.R.A","O.A.E"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1627636724_ADM.jpg" },
      ],
    },
    "gastroenterology": {
      sourceTitle: "GASTROENTEROLOGY DEPARTMENT",
      intro: "The Gastroenterology department, under the supervision of qualified Gastroenterologist carry out procedures like : Endoscopy",
      sections: [
        { title: "GASTROENTEROLOGY", description: "", tests: ["Upper G.I. Endoscopy","Rapid Urease Test for H.Pylori","Endoscopic Biopsy"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1643462951_1626497352_ENDOSCOPY.jpg" },
      ],
    },
    "urology": {
      sourceTitle: "UROLOGY DEPARTMENT",
      intro: "Available Urology procedure",
      sections: [
        { title: "UROLOGY", description: "", tests: ["Uroflowmetry"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626533258_urology.jpg" },
      ],
    },
    "others": {
      sourceTitle: "OTHER TESTS",
      intro: "",
      sections: [
        { title: "OTHERS", description: "", tests: ["Lung Function Test","Carotid Doppler Study","Peripheral Vascular Study","Physiotherapy"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626533149_PFT.jpg" },
      ],
    },
  },
  "gangarampur": {
    "pathology": {
      sourceTitle: "PATHOLOGY DEPARTMENT",
      intro: "SONOSCAN under takes a wide range of Pathological Examinations in a state-of-the art Laboratory under the supervision of qualified experienced Pathologists and technical staff. In order to maintain high Laboratory standard, Internal & External Quality Control are performed regularly . We have bar-coded sample identification and computer interfacing systems for report generation in our laboratory.",
      sections: [
        { title: "HAEMATOLOGY", description: "Wide range of routine as well as special tests done Offers a wide array of screening, diagnostic, prognostic and monitoring tests for hematopoietic diseases. Services include comprehensive testing for thrombotic and bleeding disorders.", tests: ["CBC, Complete Haemogram, Coagulation tests, Diagnosis of Thalassemia and other Haemolytic anaemias, Bone Marrow Examination etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626527713_MLD PATH 1.jpg" },
        { title: "BIOCHEMISTRY & SEROLOGY", description: "Well-equipped department providing routine and special diagnostic as well as screening services.With all state-of-the-art fully automated high throughput instruments employing spectrophotometric, turbidimetric, electro chemiluminiscent and ELISA techniques. HPLC technique for estimation of HbA1c. Reporting of HbA1c in dual units (NGSP and IFCC) The fetal risk assessment menu is designed to aid the clinician identify, manage, and follow up high-risk and/or complicated pregnancies. Maternal serum screening (Triple Test) is used to detect cases of neural tube defects, trisomy 18, and trisomy 21 (Down syndrome). Analyses are performed by a dedicated team of laboratory technicians. Same day reporting for majority of tests.", tests: ["Routine and special Biochemical parameters, Hormone assay, Specially Lactate, Ammonia, D.Dimer, IL6, C3, C4, Ceruloplasmin, ACL, Lupas Anticoagulent, APLA Profile, Special Maternal Marker, Double Marker, Triple Marker, Quadruple Marker & Others."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626528060_MLD PA -2.jpg" },
        { title: "IMMUNOLOGY", description: "Wide range of routine as well as special tests done", tests: ["TORCH Panel, Hepatitis Panel, Autoimmune Panel, Hepatitis-B Profile, Liver Panel (AMA, LKM Antibody, LC-1, SLA/LP), ANA, DSDNA, ANA Profile by Immunofluorescence technology, ANCA (C+P) etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1642000702_ARKITEC-1.jpg" },
        { title: "MICROBIOLOGY", description: "Entire panel of routine as well as special tests done. Well-equipped analytical expertise in all areas of microbiology including antimicrobial susceptibility testing, bacteriology, mycobacteriology, mycology, parasitology, and virology. Range of testing from routine bacterial cultures and serological assays to the latest in molecular-based techniques, such as real-time qualitative and quantitative PCR & GeneXpert technology IImmunofluorescence tests for autoimmune markers.", tests: ["EAutomated Aerobic and Anaerobic culture, automated microbial identification and antibiotic susceptibility test. Mycobacterial culture, fungal Culture, Blood Culture and others."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626528529_MLD PATH-3.jpg" },
        { title: "MOLECULAR BIOLOGY", description: "Wide range of routine as well as special tests done", tests: ["COVID-19 RTPCR, TBPCR (genxpert), HLA B27 PCR, BCR ABL PCR, Hepatities-B viral load DNA PCR, HIV RNA PCR, HCV RNA PCR etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1642000779_PIC-3.jpg" },
        { title: "HISTOPATHOLOGY, CYTOPATHOLOGY, FNAC & BONE MARROW STUDY", description: "LIQUID BASED CYTOLOGY (LBC) is a relatively new technology intended to improve detection of cytological abnormalities and considered as a new, efficacious and highly sensitive way of cervical screening and detection of malignant cell in fluid specimen. Cell block preparation from fluid specimens and examination are routinely done for enhanced detection of malignant cells. Routine diagnostic histopathology service aided by various types of special stains. Reporting of malignant-tumours according to College of American Pathologist (CAP) Protocol.", tests: ["Direct USG & CT guided FNAC, PAP Staining of gynaecological smear & Imprint smear. Body fluid & Bal fluid cytology. Brush cytology, Urine Cytology. Different types of biopsies and Cell Block"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626528779_his mld.jpg" },
        { title: "CLINICAL PATHOLOGY", description: "Wide array of tests available for blood, urine, CSF and other body fluids. Same day reporting", tests: ["Routine & Special tests of Urine, Stool, Semen & Body Fluids etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626528318_cli.jpg" },
        { title: "SPECIAL PARAMETERS", description: "Wide range of routine as well as special tests done", tests: ["Tumour Marker, CA 125, AFP, CA 15-3, CA 19.9, CEA, Beta 2 Microglobulin."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1642000854_PIC-9.jpg" },
      ],
    },
    "radiology": {
      sourceTitle: "RADIOLOGY & IMAGING DEPARTMENT",
      intro: "The Department of Radiology & Imaging is equipped with the most sophisticated advanced instruments of International class. A team of qualified, skilled Radiologists is attached with this department to perform various types of conventional and interventional radiological procedures.Different procedures of Radiology & Imaging Department.",
      sections: [
        { title: "AI Based 96 Slice C.T. SCAN", description: "Faster scan with thinner section (0.6) which provides low radiation with high resolution and easy to perform for the restless patient with better diagnosis.", tests: ["Brain, Spine, Head & Neck, Chest, Abdomen, Great Vessels etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626496635_CT MLD.jpg" },
        { title: "HIGH END 4D ULTRASONOGRAPHY & 4D COLOUR DOPPLER", description: "Engineered for efficiency and reliability, and powered by international standard equipments which provide outstanding image quality, advanced features, and improved usability.", tests: ["Abdominal, Obstetrics & Gynaecological, Foetal Anomaly, Small Parts, Joints, Soft Tissu, Trans Vaginal, Trans Rectal & Image Guided Procedures etc."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626496864_USG.jpg" },
        { title: "DR SYSTEM X-RAY", description: "Powered by completely digital equipments, the Direct Radiography wing covers Routine & Special X-Ray.", tests: ["Routine X-Ray, Ba-Meal & Ba-Swallow, I.V.U, M.C.U, Ascending Urethrogram, Sinogram, HSG and others."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626496737_dr mld.jpg" },
      ],
    },
    "cardiology": {
      sourceTitle: "CARDIOLOGY DEPARTMENT",
      intro: "The Cardiology department is designed with sophisticated, non-invasive diagnostic modules acquired from internationally reputed manufacturers. Various cardiac procedures like,",
      sections: [
        { title: "CARDIOLOGY", description: "", tests: ["Digital ECG","Echocardiography & Colour Doppler","Feotal Echocardiography","Paediatric Echocardiography","Holter Monitoring","24 hour BP recording"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626497041_car-mld.jpg" },
      ],
    },
    "neurology": {
      sourceTitle: "NEUROLOGY DEPARTMENT",
      intro: "With the rise of incidences of neurological disorders across the world, Sonoscan, under the supervision of experienced neurologists, has introduced a wide range of non-invasive diagnostic tests like:",
      sections: [
        { title: "NEUROLOGY", description: "", tests: ["Digital EEG","EMG","NCV","VEP","BERA"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626696661_mld neuro.jpg" },
      ],
    },
    "ent": {
      sourceTitle: "E.N.T. DEPARTMENT",
      intro: "E.N.T procedures available are:",
      sections: [
        { title: "ENT", description: "", tests: ["Pure tone Audiometry","Tympanometry","B.E.R.A","Laryngoscopy","Ear endoscopy","Nasal endoscopy"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626497221_ADM.jpg" },
      ],
    },
    "gastroenterology": {
      sourceTitle: "GASTROENTEROLOGY DEPARTMENT",
      intro: "The Gastroenterology department, under the supervision of qualified Gastroenterologists carries out procedures like",
      sections: [
        { title: "GASTROENTEROLOGY", description: "", tests: ["Upper GI endoscopy"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626497352_ENDOSCOPY.jpg" },
      ],
    },
    "urology": {
      sourceTitle: "UROLOGY DEPARTMENT",
      intro: "Available Urology procedure",
      sections: [
        { title: "UROLOGY", description: "", tests: ["Uroflowmetry"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626497527_urology.jpg" },
      ],
    },
    "dental": {
      sourceTitle: "Sate of the art Dental Clinic",
      intro: "At SONOSCAN, dentistry goes beyond treatment - it's about comfort, precision, and lasting confidence. Our state-of-the-art Dental Unit in GANGARAMPUR combines advanced technology, experienced specialists, and patient-friendly care to deliver world-class oral health solutions under one roof. Smile brighter; live healthier - with SONOSCAN Dental Unit, your oral health is in trusted hands.",
      sections: [
        { title: "Why Choose Us?", description: "", tests: ["Digital OPG X-Ray for panoramic and precise imaging.","Comprehensive Services - preventive, restorative, cosmetic, orthodontic, prosthetic, and emergency care.","Emergency & Pain Relief - quick relief from toothaches, infections, and fractures with expert intervention.","Cosmetic & Smile Design - whitening, veneers, tooth & gum contouring, braces, aligners, and digital smile makeovers.","Counseling & Care Plans - personalized guidance on diet, hygiene, and long-term oral health strategies."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1756543027_interior-cabinet-dentist-with-modern-equipment (1).jpg" },
        { title: "Our Services at a Glance", description: "Preventive Care: Regular check-ups, scaling, fluoride therapy.", tests: ["Restorative Dentistry: Fillings, root canal treatment, crowns & bridges.","Implants & Prosthetics: Safe, lasting replacements for missing teeth.","Orthodontics: Braces & aligners for all ages.","Cosmetic Dentistry: Whitening, veneers, smile design, gum & tooth contouring.","Emergency Care: Immediate pain relief & urgent dental treatment."], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1756543098_dentist-treats-childs-tooth-using-rubber-dam-closeup-tooth-treatment (1).jpg" },
      ],
    },
    "others": {
      sourceTitle: "OTHER TESTS",
      intro: "Apart from these regular procedures, other tests that are performed here are :",
      sections: [
        { title: "OTHERS", description: "", tests: ["Lung Function Test with","Carotid Doppler Study","Peripheral Vascular Study"], img: "https://www.sonoscanhealthcare.net/sono/adminpanel/imagefiles/1626498156_PFT.jpg" },
      ],
    },
  },
}
