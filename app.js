/**
 * ============================================================================
 * AIIMS Bhubaneswar MBBS Batch 2025 - app.js
 * Comprehensive Interactive Calendar & Timetable Engine
 * ============================================================================
 */

/* ---------- CONFIGURATION & THEMES ---------- */
const DAYS        = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAY_SHORT   = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'November', 'December'];
const GRID_START  = 8;   // 08:00 AM
const GRID_END    = 18;  // 06:00 PM
const SLOT_HEIGHT = 64;  // Height in px per hour row

// Department Theme Tokens
const DEPT_THEMES = {
  'Pathology': {
    bg: 'var(--path-bg)',
    border: 'var(--path-border)',
    accent: 'var(--path-accent)',
    text: 'var(--path-text)',
    short: 'Pathology'
  },
  'Pharmacology': {
    bg: 'var(--pharm-bg)',
    border: 'var(--pharm-border)',
    accent: 'var(--pharm-accent)',
    text: 'var(--pharm-text)',
    short: 'Pharm'
  },
  'Microbiology': {
    bg: 'var(--micro-bg)',
    border: 'var(--micro-border)',
    accent: 'var(--micro-accent)',
    text: 'var(--micro-text)',
    short: 'Micro'
  },
  'Forensic Medicine & Toxicology': {
    bg: 'var(--fmt-bg)',
    border: 'var(--fmt-border)',
    accent: 'var(--fmt-accent)',
    text: 'var(--fmt-text)',
    short: 'FMT'
  },
  'Community Medicine': {
    bg: 'var(--cmfm-bg)',
    border: 'var(--cmfm-border)',
    accent: 'var(--cmfm-accent)',
    text: 'var(--cmfm-text)',
    short: 'CMFM'
  },
  'General Medicine': {
    bg: 'var(--med-bg)',
    border: 'var(--med-border)',
    accent: 'var(--med-accent)',
    text: 'var(--med-text)',
    short: 'Medicine'
  },
  'Paediatrics': {
    bg: 'var(--paed-bg)',
    border: 'var(--paed-border)',
    accent: 'var(--paed-accent)',
    text: 'var(--paed-text)',
    short: 'Paediatrics'
  },
  'Obstetrics & Gynaecology': {
    bg: 'var(--obg-bg)',
    border: 'var(--obg-border)',
    accent: 'var(--obg-accent)',
    text: 'var(--obg-text)',
    short: 'OBG'
  }
};

function getDeptTheme(dept) {
  return DEPT_THEMES[dept] || {
    bg: '#F1F5F9',
    border: '#CBD5E1',
    accent: '#475569',
    text: '#0F172A',
    short: dept || 'Class'
  };
}

/* ---------- EMBEDDED SCHEDULE DATASET (OFFLINE & FILE:// SAFE) ---------- */
const EMBEDDED_SCHEDULE = [
  {
    "id": "pharm-01",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Theory",
    "topic": "Introduction to Pharmacology",
    "faculty": "Dr D Hota",
    "room": "LT-1",
    "date": "2026-08-27",
    "day": "Thursday",
    "start_time": "14:00",
    "end_time": "15:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "pharm-02",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Practical",
    "topic": "Exercise 1: Routes of drug administration (Oral / parenteral)",
    "faculty": "Dr Richardson, Dr Archana AS",
    "room": "Pharm Lab",
    "date": "2026-08-27",
    "day": "Thursday",
    "start_time": "15:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "pharm-03",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Theory",
    "topic": "Drug: nature, source, nomenclature, drug compendias",
    "faculty": "Dr Ajaya K Sahoo",
    "room": "LT-1",
    "date": "2026-08-28",
    "day": "Friday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "path-01",
    "department": "Pathology",
    "subject": "Pathology",
    "class_type": "Theory",
    "topic": "Introduction to Pathology",
    "faculty": "Dr Amit Kumar Adhya",
    "room": "LT-1",
    "date": "2026-08-28",
    "day": "Friday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Pathology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "path-02",
    "department": "Pathology",
    "subject": "Pathology",
    "class_type": "Practical",
    "topic": "Visit to Pathology Lab (Grossing, Histology, Cytology, Hematology)",
    "faculty": "Dr S Padhi, Dr Tapas, Dr Naveen, Dr Bakia, Dr Satabdi, Dr Sanjana",
    "room": "Pathology Lab",
    "date": "2026-08-28",
    "day": "Friday",
    "start_time": "15:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Pathology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "fmt-01",
    "department": "Forensic Medicine & Toxicology",
    "subject": "FMT",
    "class_type": "Theory",
    "topic": "Introduction to Forensic Medicine",
    "faculty": "Dr. Manoj Kumar Mohanty",
    "room": "LT-1",
    "date": "2026-08-29",
    "day": "Saturday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Forensic Medicine & Toxicology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "cmfm-01",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Man and Medicine towards heath for all",
    "faculty": "Dr. Manish Taywade",
    "room": "LT-1",
    "date": "2026-08-29",
    "day": "Saturday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "path-03",
    "department": "Pathology",
    "subject": "Pathology",
    "class_type": "Theory",
    "topic": "Cellular adaptation; reversible vs. irreversible cell injury",
    "faculty": "Dr Mukund N Sable",
    "room": "LT-1",
    "date": "2026-08-31",
    "day": "Monday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Pathology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "pharm-04",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Theory",
    "topic": "Pharmacokinetics (1)",
    "faculty": "Dr BM Padhy",
    "room": "LT-1",
    "date": "2026-08-31",
    "day": "Monday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "fmt-02",
    "department": "Forensic Medicine & Toxicology",
    "subject": "FMT",
    "class_type": "Theory",
    "topic": "Legal procedure – I",
    "faculty": "Dr. Manas Ranjan Sahu",
    "room": "LT-1",
    "date": "2026-08-31",
    "day": "Monday",
    "start_time": "14:00",
    "end_time": "15:00",
    "group": "all",
    "notes": "Dept. of Forensic Medicine & Toxicology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "fmt-03",
    "department": "Forensic Medicine & Toxicology",
    "subject": "FMT",
    "class_type": "Practical",
    "topic": "Orientation to FMT Department lab & Mortuary",
    "faculty": "Faculty / Resident",
    "room": "FMT Lab & Mortuary",
    "date": "2026-08-31",
    "day": "Monday",
    "start_time": "15:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Forensic Medicine & Toxicology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "micro-01",
    "department": "Microbiology",
    "subject": "Microbiology",
    "class_type": "Theory",
    "topic": "Morphology & classification of bacteria",
    "faculty": "Dr. DP",
    "room": "LT-1",
    "date": "2026-09-01",
    "day": "Tuesday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Microbiology • 3rd Semester MBBS 2025 Batch"
  },
  {
    "id": "fmt-04",
    "department": "Forensic Medicine & Toxicology",
    "subject": "FMT",
    "class_type": "Theory",
    "topic": "Legal procedure – II",
    "faculty": "Dr. Manas Ranjan Sahu",
    "room": "LT-1",
    "date": "2026-09-01",
    "day": "Tuesday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Forensic Medicine & Toxicology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "micro-02",
    "department": "Microbiology",
    "subject": "Microbiology",
    "class_type": "Practical",
    "topic": "Demo- Microscopy & orientation to the Microbiology Lab",
    "faculty": "Microbiology Faculty",
    "room": "Micro Lab",
    "date": "2026-09-01",
    "day": "Tuesday",
    "start_time": "14:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Microbiology • 3rd Semester MBBS 2025 Batch"
  },
  {
    "id": "med-01",
    "department": "General Medicine",
    "subject": "Medicine",
    "class_type": "Theory",
    "topic": "Headache",
    "faculty": "Dr. Rashmi",
    "room": "LT-1",
    "date": "2026-09-02",
    "day": "Wednesday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of General Medicine • 3rd Semester (MBBS Batch 2025)"
  },
  {
    "id": "pharm-05",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Theory",
    "topic": "Pharmacokinetics (2)",
    "faculty": "Dr BM Padhy",
    "room": "LT-1",
    "date": "2026-09-02",
    "day": "Wednesday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "path-04",
    "department": "Pathology",
    "subject": "Pathology",
    "class_type": "Theory",
    "topic": "Necrosis: morphology and clinical correlation",
    "faculty": "Dr Mukund N Sable",
    "room": "LT-1",
    "date": "2026-09-02",
    "day": "Wednesday",
    "start_time": "14:00",
    "end_time": "15:00",
    "group": "all",
    "notes": "Dept. of Pathology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "cmfm-02",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Concept and Dimension of Health",
    "faculty": "Dr. Abhisek Mishra",
    "room": "LT-1",
    "date": "2026-09-02",
    "day": "Wednesday",
    "start_time": "15:00",
    "end_time": "16:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "paed-01",
    "department": "Paediatrics",
    "subject": "Paediatrics",
    "class_type": "Theory",
    "topic": "Introduction to Paediatrics",
    "faculty": "Prof. Dr. Samarendra Mahapatro",
    "room": "LT-1",
    "date": "2026-09-02",
    "day": "Wednesday",
    "start_time": "16:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Paediatrics • 3rd Semester (2025 BATCH)"
  },
  {
    "id": "obg-01",
    "department": "Obstetrics & Gynaecology",
    "subject": "OBG",
    "class_type": "Theory",
    "topic": "Physiology of Conception-(gametogenesis, fertilisation, steroidogenesis)",
    "faculty": "Dr S. Patra",
    "room": "LT-1",
    "date": "2026-09-03",
    "day": "Thursday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Obstetrics & Gynaecology • Batch 2025 (3rd Sem) • LT-1"
  },
  {
    "id": "micro-03",
    "department": "Microbiology",
    "subject": "Microbiology",
    "class_type": "Theory",
    "topic": "Physiology, growth & metabolism of bacteria",
    "faculty": "Dr. SM",
    "room": "LT-1",
    "date": "2026-09-03",
    "day": "Thursday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Microbiology • 3rd Semester MBBS 2025 Batch"
  },
  {
    "id": "pharm-06",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Practical",
    "topic": "Exercise 2: Routes of drug administration (topical / devices)",
    "faculty": "Dr Richardson, Dr Nidhi",
    "room": "Pharm Lab",
    "date": "2026-09-03",
    "day": "Thursday",
    "start_time": "15:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "pharm-07",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Theory",
    "topic": "Pharmacokinetics (3)",
    "faculty": "Dr BM Padhy",
    "room": "LT-1",
    "date": "2026-09-04",
    "day": "Friday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "path-05",
    "department": "Pathology",
    "subject": "Pathology",
    "class_type": "Theory",
    "topic": "Apoptosis",
    "faculty": "Dr Mukund N Sable",
    "room": "LT-1",
    "date": "2026-09-04",
    "day": "Friday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Pathology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "path-06",
    "department": "Pathology",
    "subject": "Pathology",
    "class_type": "Practical",
    "topic": "Necrosis: types (gross & micro), caseous necrosis, atrophy, hypertrophy, metaplasia",
    "faculty": "Dr Mukund N Sable, ALL CYTOLOGY Residents",
    "room": "Pathology Lab",
    "date": "2026-09-04",
    "day": "Friday",
    "start_time": "15:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Pathology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "fmt-05",
    "department": "Forensic Medicine & Toxicology",
    "subject": "FMT",
    "class_type": "Theory",
    "topic": "Identification – I",
    "faculty": "Dr. Sindhu Sudha Sahu",
    "room": "LT-1",
    "date": "2026-09-05",
    "day": "Saturday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Forensic Medicine & Toxicology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "cmfm-03",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Determinants of health",
    "faculty": "Dr. Prajna Paramita Giri",
    "room": "LT-1",
    "date": "2026-09-05",
    "day": "Saturday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "path-07",
    "department": "Pathology",
    "subject": "Pathology",
    "class_type": "Theory",
    "topic": "Necroptosis, misfolded proteins, cellular ageing, telomeres",
    "faculty": "Dr Mukund N Sable",
    "room": "LT-1",
    "date": "2026-09-07",
    "day": "Monday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Pathology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "pharm-08",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Theory",
    "topic": "Pharmacokinetics (4)",
    "faculty": "Dr BM Padhy",
    "room": "LT-1",
    "date": "2026-09-07",
    "day": "Monday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "fmt-06",
    "department": "Forensic Medicine & Toxicology",
    "subject": "FMT",
    "class_type": "Theory",
    "topic": "Identification – II",
    "faculty": "Dr. Sindhu Sudha Sahu",
    "room": "LT-1",
    "date": "2026-09-07",
    "day": "Monday",
    "start_time": "14:00",
    "end_time": "15:00",
    "group": "all",
    "notes": "Dept. of Forensic Medicine & Toxicology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "fmt-07",
    "department": "Forensic Medicine & Toxicology",
    "subject": "FMT",
    "class_type": "Practical",
    "topic": "Skull bone – Age, Sex & Race",
    "faculty": "Faculty / Resident",
    "room": "FMT Lab",
    "date": "2026-09-07",
    "day": "Monday",
    "start_time": "15:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Forensic Medicine & Toxicology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "micro-04",
    "department": "Microbiology",
    "subject": "Microbiology",
    "class_type": "Theory",
    "topic": "Sterilization physical Methods-1",
    "faculty": "Dr. AM",
    "room": "LT-1",
    "date": "2026-09-08",
    "day": "Tuesday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Microbiology • 3rd Semester MBBS 2025 Batch"
  },
  {
    "id": "fmt-08",
    "department": "Forensic Medicine & Toxicology",
    "subject": "FMT",
    "class_type": "Theory",
    "topic": "Legal procedure – III",
    "faculty": "Dr. Manas Ranjan Sahu",
    "room": "LT-1",
    "date": "2026-09-08",
    "day": "Tuesday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Forensic Medicine & Toxicology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "micro-05",
    "department": "Microbiology",
    "subject": "Microbiology",
    "class_type": "Practical",
    "topic": "Demo - Morphology of bacteria Practical Gram Stain",
    "faculty": "Microbiology Faculty",
    "room": "Micro Lab",
    "date": "2026-09-08",
    "day": "Tuesday",
    "start_time": "14:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Microbiology • 3rd Semester MBBS 2025 Batch"
  },
  {
    "id": "med-02",
    "department": "General Medicine",
    "subject": "Medicine",
    "class_type": "Theory",
    "topic": "Nausea, vomiting, Anorexia",
    "faculty": "Dr. Dhriti",
    "room": "LT-1",
    "date": "2026-09-09",
    "day": "Wednesday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of General Medicine • 3rd Semester (MBBS Batch 2025)"
  },
  {
    "id": "pharm-09",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Theory",
    "topic": "Introduction to Clinical Pharmacology and Drug development process",
    "faculty": "Dr D Hota",
    "room": "LT-1",
    "date": "2026-09-09",
    "day": "Wednesday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "path-08",
    "department": "Pathology",
    "subject": "Pathology",
    "class_type": "Theory",
    "topic": "Intracellular accumulation, dystrophic vs metastatic calcification, free radical injury",
    "faculty": "Dr Mukund N Sable",
    "room": "LT-1",
    "date": "2026-09-09",
    "day": "Wednesday",
    "start_time": "14:00",
    "end_time": "15:00",
    "group": "all",
    "notes": "Dept. of Pathology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "cmfm-04",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Indicator of health-I",
    "faculty": "Dr. Prajna Paramita Giri",
    "room": "LT-1",
    "date": "2026-09-09",
    "day": "Wednesday",
    "start_time": "15:00",
    "end_time": "16:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "paed-02",
    "department": "Paediatrics",
    "subject": "Paediatrics",
    "class_type": "Theory",
    "topic": "History taking and its scheme in Paediatrics",
    "faculty": "Prof. Dr. Joseph John",
    "room": "LT-1",
    "date": "2026-09-09",
    "day": "Wednesday",
    "start_time": "16:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Paediatrics • 3rd Semester (2025 BATCH)"
  },
  {
    "id": "obg-02",
    "department": "Obstetrics & Gynaecology",
    "subject": "OBG",
    "class_type": "Theory",
    "topic": "Placenta (structure, development, function, placental circulation)",
    "faculty": "Dr. S. Mitra",
    "room": "LT-1",
    "date": "2026-09-10",
    "day": "Thursday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Obstetrics & Gynaecology • Batch 2025 (3rd Sem) • LT-1"
  },
  {
    "id": "micro-06",
    "department": "Microbiology",
    "subject": "Microbiology",
    "class_type": "Theory",
    "topic": "Bacterial genetics -1",
    "faculty": "Dr. SM",
    "room": "LT-1",
    "date": "2026-09-10",
    "day": "Thursday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Microbiology • 3rd Semester MBBS 2025 Batch"
  },
  {
    "id": "pharm-10",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Theory",
    "topic": "Drug dosage forms",
    "faculty": "Dr Abhishek Anil",
    "room": "LT-1",
    "date": "2026-09-10",
    "day": "Thursday",
    "start_time": "14:00",
    "end_time": "15:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "pharm-11",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Practical",
    "topic": "Exercise 3: Drug dosage forms",
    "faculty": "Dr Abhishek Anil, Dr Preksha",
    "room": "Pharm Lab",
    "date": "2026-09-10",
    "day": "Thursday",
    "start_time": "15:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "pharm-12",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Theory",
    "topic": "Factors modifying drug action",
    "faculty": "Dr Pragya",
    "room": "LT-1",
    "date": "2026-09-11",
    "day": "Friday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "path-09",
    "department": "Pathology",
    "subject": "Pathology",
    "class_type": "Theory",
    "topic": "Acute inflammation-Vascular events",
    "faculty": "Dr Amit Kumar Adhya",
    "room": "LT-1",
    "date": "2026-09-11",
    "day": "Friday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Pathology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "path-10",
    "department": "Pathology",
    "subject": "Pathology",
    "class_type": "Practical",
    "topic": "Dystrophic calcification, pigments, others",
    "faculty": "Dr Mukund N Sable, ALL CYTOLOGY Residents",
    "room": "Pathology Lab",
    "date": "2026-09-11",
    "day": "Friday",
    "start_time": "15:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Pathology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "fmt-09",
    "department": "Forensic Medicine & Toxicology",
    "subject": "FMT",
    "class_type": "Theory",
    "topic": "Legal procedure – IV",
    "faculty": "Dr. Manas Ranjan Sahu",
    "room": "LT-1",
    "date": "2026-09-12",
    "day": "Saturday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Forensic Medicine & Toxicology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "cmfm-05",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Indicator of health-II",
    "faculty": "Dr. Prajna Paramita Giri",
    "room": "LT-1",
    "date": "2026-09-12",
    "day": "Saturday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "path-11",
    "department": "Pathology",
    "subject": "Pathology",
    "class_type": "Theory",
    "topic": "Acute inflammation-Cellular events",
    "faculty": "Dr Amit Kumar Adhya",
    "room": "LT-1",
    "date": "2026-09-14",
    "day": "Monday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Pathology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "pharm-13",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Theory",
    "topic": "Pharmacodynamics (1)",
    "faculty": "Dr R Maiti",
    "room": "LT-1",
    "date": "2026-09-14",
    "day": "Monday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "fmt-10",
    "department": "Forensic Medicine & Toxicology",
    "subject": "FMT",
    "class_type": "Theory",
    "topic": "Identification – III",
    "faculty": "Dr. Sindhu Sudha Sahu",
    "room": "LT-1",
    "date": "2026-09-14",
    "day": "Monday",
    "start_time": "14:00",
    "end_time": "15:00",
    "group": "all",
    "notes": "Dept. of Forensic Medicine & Toxicology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "fmt-11",
    "department": "Forensic Medicine & Toxicology",
    "subject": "FMT",
    "class_type": "Practical",
    "topic": "Pelvis bone – Age & Sex",
    "faculty": "Faculty / Resident",
    "room": "FMT Lab",
    "date": "2026-09-14",
    "day": "Monday",
    "start_time": "15:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Forensic Medicine & Toxicology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "micro-07",
    "department": "Microbiology",
    "subject": "Microbiology",
    "class_type": "Theory",
    "topic": "Sterilization physical Methods - 2",
    "faculty": "Dr. VH",
    "room": "LT-1",
    "date": "2026-09-15",
    "day": "Tuesday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Microbiology • 3rd Semester MBBS 2025 Batch"
  },
  {
    "id": "fmt-12",
    "department": "Forensic Medicine & Toxicology",
    "subject": "FMT",
    "class_type": "Theory",
    "topic": "Identification – IV",
    "faculty": "Dr. Sindhu Sudha Sahu",
    "room": "LT-1",
    "date": "2026-09-15",
    "day": "Tuesday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Forensic Medicine & Toxicology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "micro-08",
    "department": "Microbiology",
    "subject": "Microbiology",
    "class_type": "Practical",
    "topic": "Demo- Sterilization",
    "faculty": "Microbiology Faculty",
    "room": "Micro Lab",
    "date": "2026-09-15",
    "day": "Tuesday",
    "start_time": "14:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Microbiology • 3rd Semester MBBS 2025 Batch"
  },
  {
    "id": "med-03",
    "department": "General Medicine",
    "subject": "Medicine",
    "class_type": "Theory",
    "topic": "Syncope",
    "faculty": "Dr. Anupama",
    "room": "LT-1",
    "date": "2026-09-16",
    "day": "Wednesday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of General Medicine • 3rd Semester (MBBS Batch 2025)"
  },
  {
    "id": "pharm-14",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Theory",
    "topic": "Pharmacodynamics (2)",
    "faculty": "Dr R Maiti",
    "room": "LT-1",
    "date": "2026-09-16",
    "day": "Wednesday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "path-12",
    "department": "Pathology",
    "subject": "Pathology",
    "class_type": "Theory",
    "topic": "Chemical mediators of inflammation",
    "faculty": "Dr Amit Kumar Adhya",
    "room": "LT-1",
    "date": "2026-09-16",
    "day": "Wednesday",
    "start_time": "14:00",
    "end_time": "15:00",
    "group": "all",
    "notes": "Dept. of Pathology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "cmfm-06",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Physical Activity, Exercise and METs",
    "faculty": "Dr. Abhisek Mishra",
    "room": "LT-1",
    "date": "2026-09-16",
    "day": "Wednesday",
    "start_time": "15:00",
    "end_time": "16:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "paed-03",
    "department": "Paediatrics",
    "subject": "Paediatrics",
    "class_type": "Theory",
    "topic": "General examination including anthropometry",
    "faculty": "Prof. Dr. Bhagirathi Dwibedi",
    "room": "LT-1",
    "date": "2026-09-16",
    "day": "Wednesday",
    "start_time": "16:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Paediatrics • 3rd Semester (2025 BATCH)"
  },
  {
    "id": "obg-03",
    "department": "Obstetrics & Gynaecology",
    "subject": "OBG",
    "class_type": "Theory",
    "topic": "Fetal Physiology and Growth",
    "faculty": "Dr S K Jena",
    "room": "LT-1",
    "date": "2026-09-17",
    "day": "Thursday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Obstetrics & Gynaecology • Batch 2025 (3rd Sem) • LT-1"
  },
  {
    "id": "micro-09",
    "department": "Microbiology",
    "subject": "Microbiology",
    "class_type": "Theory",
    "topic": "Culture media",
    "faculty": "Dr. AM",
    "room": "LT-1",
    "date": "2026-09-17",
    "day": "Thursday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Microbiology • 3rd Semester MBBS 2025 Batch"
  },
  {
    "id": "pharm-15",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Practical",
    "topic": "Exercise 4: Study of absorption and bioavailability",
    "faculty": "Dr Sayantan, Dr Bharat",
    "room": "Pharm Lab",
    "date": "2026-09-17",
    "day": "Thursday",
    "start_time": "14:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "pharm-16",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Theory",
    "topic": "Pharmacodynamics (3)",
    "faculty": "Dr R Maiti",
    "room": "LT-1",
    "date": "2026-09-18",
    "day": "Friday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "path-13",
    "department": "Pathology",
    "subject": "Pathology",
    "class_type": "Theory",
    "topic": "Chronic Inflammation, granulomatous inflammation",
    "faculty": "Dr Amit Kumar Adhya",
    "room": "LT-1",
    "date": "2026-09-18",
    "day": "Friday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Pathology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "path-14",
    "department": "Pathology",
    "subject": "Pathology",
    "class_type": "Practical",
    "topic": "Inflammation: gross and microscopy (Appendix, gall bladder), granuloma",
    "faculty": "Dr Amit Kumar Adhya, ALL CYTOLOGY Residents",
    "room": "Pathology Lab",
    "date": "2026-09-18",
    "day": "Friday",
    "start_time": "15:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Pathology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "fmt-13",
    "department": "Forensic Medicine & Toxicology",
    "subject": "FMT",
    "class_type": "Theory",
    "topic": "Legal procedure – V",
    "faculty": "Dr. Manas Ranjan Sahu",
    "room": "LT-1",
    "date": "2026-09-19",
    "day": "Saturday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Forensic Medicine & Toxicology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "cmfm-07",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Revision",
    "faculty": "Dr. Manish Taywade",
    "room": "LT-1",
    "date": "2026-09-19",
    "day": "Saturday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "path-15",
    "department": "Pathology",
    "subject": "Pathology",
    "class_type": "Theory",
    "topic": "Cutaneous wound healing and repair",
    "faculty": "Dr Amit Kumar Adhya",
    "room": "LT-1",
    "date": "2026-09-21",
    "day": "Monday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Pathology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "pharm-17",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Theory",
    "topic": "Annual Day Celebrations",
    "faculty": "AIIMS Bhubaneswar",
    "room": "Auditorium",
    "date": "2026-09-21",
    "day": "Monday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "fmt-14",
    "department": "Forensic Medicine & Toxicology",
    "subject": "FMT",
    "class_type": "Theory",
    "topic": "Identification – V",
    "faculty": "Dr. Sindhu Sudha Sahu",
    "room": "LT-1",
    "date": "2026-09-21",
    "day": "Monday",
    "start_time": "14:00",
    "end_time": "15:00",
    "group": "all",
    "notes": "Dept. of Forensic Medicine & Toxicology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "fmt-15",
    "department": "Forensic Medicine & Toxicology",
    "subject": "FMT",
    "class_type": "Practical",
    "topic": "Long bone of upper limb",
    "faculty": "Faculty / Resident",
    "room": "FMT Lab",
    "date": "2026-09-21",
    "day": "Monday",
    "start_time": "15:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Forensic Medicine & Toxicology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "micro-10",
    "department": "Microbiology",
    "subject": "Microbiology",
    "class_type": "Theory",
    "topic": "Disinfection",
    "faculty": "Dr. DP",
    "room": "LT-1",
    "date": "2026-09-22",
    "day": "Tuesday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Microbiology • 3rd Semester MBBS 2025 Batch"
  },
  {
    "id": "fmt-16",
    "department": "Forensic Medicine & Toxicology",
    "subject": "FMT",
    "class_type": "Theory",
    "topic": "Identification – VI",
    "faculty": "Dr. Sindhu Sudha Sahu",
    "room": "LT-1",
    "date": "2026-09-22",
    "day": "Tuesday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Forensic Medicine & Toxicology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "micro-11",
    "department": "Microbiology",
    "subject": "Microbiology",
    "class_type": "Practical",
    "topic": "Demo- Disinfection",
    "faculty": "Microbiology Faculty",
    "room": "Micro Lab",
    "date": "2026-09-22",
    "day": "Tuesday",
    "start_time": "14:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Microbiology • 3rd Semester MBBS 2025 Batch"
  },
  {
    "id": "med-04",
    "department": "General Medicine",
    "subject": "Medicine",
    "class_type": "Theory",
    "topic": "Confusion and Delirium",
    "faculty": "Dr. Srikant",
    "room": "LT-1",
    "date": "2026-09-23",
    "day": "Wednesday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of General Medicine • 3rd Semester (MBBS Batch 2025)"
  },
  {
    "id": "pharm-18",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Theory",
    "topic": "Pharmacodynamics (4)",
    "faculty": "Dr R Maiti",
    "room": "LT-1",
    "date": "2026-09-23",
    "day": "Wednesday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "path-16",
    "department": "Pathology",
    "subject": "Pathology",
    "class_type": "Theory",
    "topic": "Cell cycle and stem cells",
    "faculty": "Dr Gaurav Chhabra",
    "room": "LT-1",
    "date": "2026-09-23",
    "day": "Wednesday",
    "start_time": "14:00",
    "end_time": "15:00",
    "group": "all",
    "notes": "Dept. of Pathology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "cmfm-08",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Health Service Philosophies",
    "faculty": "Dr. Abhisek Mishra",
    "room": "LT-1",
    "date": "2026-09-23",
    "day": "Wednesday",
    "start_time": "15:00",
    "end_time": "16:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "paed-04",
    "department": "Paediatrics",
    "subject": "Paediatrics",
    "class_type": "Theory",
    "topic": "Normal growth",
    "faculty": "Prof. Dr. Rashmi Ranjan Das",
    "room": "LT-1",
    "date": "2026-09-23",
    "day": "Wednesday",
    "start_time": "16:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Paediatrics • 3rd Semester (2025 BATCH)"
  },
  {
    "id": "obg-04",
    "department": "Obstetrics & Gynaecology",
    "subject": "OBG",
    "class_type": "Theory",
    "topic": "Development and applied anatomy of the female internal genitalia",
    "faculty": "Dr S. Singh",
    "room": "LT-1",
    "date": "2026-09-24",
    "day": "Thursday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Obstetrics & Gynaecology • Batch 2025 (3rd Sem) • LT-1"
  },
  {
    "id": "micro-12",
    "department": "Microbiology",
    "subject": "Microbiology",
    "class_type": "Theory",
    "topic": "Bacterial genetics -1",
    "faculty": "Dr. SM",
    "room": "LT-1",
    "date": "2026-09-24",
    "day": "Thursday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Microbiology • 3rd Semester MBBS 2025 Batch"
  },
  {
    "id": "pharm-19",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Practical",
    "topic": "Exercise 5: Calculation of drug dosage and percent solutions",
    "faculty": "Dr Aswini",
    "room": "Pharm Lab",
    "date": "2026-09-24",
    "day": "Thursday",
    "start_time": "14:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "pharm-20",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Theory",
    "topic": "Adverse drug reactions",
    "faculty": "Dr BM Padhy",
    "room": "LT-1",
    "date": "2026-09-25",
    "day": "Friday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "path-17",
    "department": "Pathology",
    "subject": "Pathology",
    "class_type": "Theory",
    "topic": "Patient biosafety",
    "faculty": "Dr Gaurav Chhabra",
    "room": "LT-1",
    "date": "2026-09-25",
    "day": "Friday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Pathology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "path-18",
    "department": "Pathology",
    "subject": "Pathology",
    "class_type": "Practical",
    "topic": "Granulation tissue, granuloma, keloid, revision / pending topics",
    "faculty": "Dr Amit K Adhya, ALL CYTOLOGY Residents",
    "room": "Pathology Lab",
    "date": "2026-09-25",
    "day": "Friday",
    "start_time": "15:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Pathology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "fmt-17",
    "department": "Forensic Medicine & Toxicology",
    "subject": "FMT",
    "class_type": "Theory",
    "topic": "Death and its causes – I",
    "faculty": "Dr. Manas Ranjan Sahu",
    "room": "LT-1",
    "date": "2026-09-26",
    "day": "Saturday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Forensic Medicine & Toxicology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "cmfm-09",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Concept of Disease causation and Natural history of disease",
    "faculty": "Dr. Abhisek Mishra",
    "room": "LT-1",
    "date": "2026-09-26",
    "day": "Saturday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "path-19",
    "department": "Pathology",
    "subject": "Pathology",
    "class_type": "Theory",
    "topic": "Amyloidosis",
    "faculty": "Dr Mukund N Sable",
    "room": "LT-1",
    "date": "2026-09-28",
    "day": "Monday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Pathology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "pharm-21",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Theory",
    "topic": "Neurohumoral transmission, General concept of ANS",
    "faculty": "Dr. M Jena",
    "room": "LT-1",
    "date": "2026-09-28",
    "day": "Monday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "fmt-18",
    "department": "Forensic Medicine & Toxicology",
    "subject": "FMT",
    "class_type": "Theory",
    "topic": "Death and its causes – II",
    "faculty": "Dr. Manas Ranjan Sahu",
    "room": "LT-1",
    "date": "2026-09-28",
    "day": "Monday",
    "start_time": "14:00",
    "end_time": "15:00",
    "group": "all",
    "notes": "Dept. of Forensic Medicine & Toxicology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "fmt-19",
    "department": "Forensic Medicine & Toxicology",
    "subject": "FMT",
    "class_type": "Practical",
    "topic": "Femur, tibia & fibula",
    "faculty": "Faculty / Resident",
    "room": "FMT Lab",
    "date": "2026-09-28",
    "day": "Monday",
    "start_time": "15:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Forensic Medicine & Toxicology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "micro-13",
    "department": "Microbiology",
    "subject": "Microbiology",
    "class_type": "Theory",
    "topic": "Culture methods & Antimicrobial susceptibility test",
    "faculty": "Dr. AM",
    "room": "LT-1",
    "date": "2026-09-29",
    "day": "Tuesday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of Microbiology • 3rd Semester MBBS 2025 Batch"
  },
  {
    "id": "fmt-20",
    "department": "Forensic Medicine & Toxicology",
    "subject": "FMT",
    "class_type": "Theory",
    "topic": "Death and its causes – III",
    "faculty": "Dr. Manas Ranjan Sahu",
    "room": "LT-1",
    "date": "2026-09-29",
    "day": "Tuesday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Forensic Medicine & Toxicology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "micro-14",
    "department": "Microbiology",
    "subject": "Microbiology",
    "class_type": "Practical",
    "topic": "Demo- Culture media",
    "faculty": "Microbiology Faculty",
    "room": "Micro Lab",
    "date": "2026-09-29",
    "day": "Tuesday",
    "start_time": "14:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Microbiology • 3rd Semester MBBS 2025 Batch"
  },
  {
    "id": "med-05",
    "department": "General Medicine",
    "subject": "Medicine",
    "class_type": "Theory",
    "topic": "Jaundice",
    "faculty": "Dr. Debananda",
    "room": "LT-1",
    "date": "2026-09-30",
    "day": "Wednesday",
    "start_time": "08:00",
    "end_time": "09:00",
    "group": "all",
    "notes": "Dept. of General Medicine • 3rd Semester (MBBS Batch 2025)"
  },
  {
    "id": "pharm-22",
    "department": "Pharmacology",
    "subject": "Pharmacology",
    "class_type": "Theory",
    "topic": "Cholinomimetic drugs (1)",
    "faculty": "Dr. M Jena",
    "room": "LT-1",
    "date": "2026-09-30",
    "day": "Wednesday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of Pharmacology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "path-20",
    "department": "Pathology",
    "subject": "Pathology",
    "class_type": "Theory",
    "topic": "Fracture healing",
    "faculty": "Dr Mukund N Sable",
    "room": "LT-1",
    "date": "2026-09-30",
    "day": "Wednesday",
    "start_time": "14:00",
    "end_time": "15:00",
    "group": "all",
    "notes": "Dept. of Pathology • 3rd Semester MBBS Batch 2025"
  },
  {
    "id": "cmfm-10",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Concept of control and Prevention",
    "faculty": "Dr. Abhisek Mishra",
    "room": "LT-1",
    "date": "2026-09-30",
    "day": "Wednesday",
    "start_time": "15:00",
    "end_time": "16:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "paed-05",
    "department": "Paediatrics",
    "subject": "Paediatrics",
    "class_type": "Theory",
    "topic": "Normal Development",
    "faculty": "Dr Pankaj Mohanty",
    "room": "LT-1",
    "date": "2026-09-30",
    "day": "Wednesday",
    "start_time": "16:00",
    "end_time": "17:00",
    "group": "all",
    "notes": "Dept. of Paediatrics • 3rd Semester (2025 BATCH)"
  },
  {
    "id": "cmfm-11",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Modes of intervention",
    "faculty": "Dr. Prajna Paramita Giri",
    "room": "LT-1",
    "date": "2026-10-03",
    "day": "Saturday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-12",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Revision",
    "faculty": "Dr. Prajna Paramita Giri",
    "room": "LT-1",
    "date": "2026-10-07",
    "day": "Wednesday",
    "start_time": "15:00",
    "end_time": "16:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-13",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Introduction and Historical Evolution of Epidemiology",
    "faculty": "Dr. Manish Taywade",
    "room": "LT-1",
    "date": "2026-10-10",
    "day": "Saturday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-14",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Basic measurement in epidemiology",
    "faculty": "Dr. Priyamadhaba Behera",
    "room": "LT-1",
    "date": "2026-10-14",
    "day": "Wednesday",
    "start_time": "15:00",
    "end_time": "16:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-15",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Architecture of Epidemiological Designs (Epidemiologic Methods)",
    "faculty": "Dr. Manish Taywade",
    "room": "LT-1",
    "date": "2026-10-17",
    "day": "Saturday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-16",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Descriptive Studies (Ecological and cross-sectional studies)",
    "faculty": "Dr. Prajna Paramita Giri",
    "room": "LT-1",
    "date": "2026-10-21",
    "day": "Wednesday",
    "start_time": "15:00",
    "end_time": "16:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-17",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Analytical Studies - I (Case-control study)",
    "faculty": "Dr. Priyamadhaba Behera",
    "room": "LT-1",
    "date": "2026-10-24",
    "day": "Saturday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-18",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Analytical Studies - II (Cohort study)",
    "faculty": "Dr. Prajna Paramita Giri",
    "room": "LT-1",
    "date": "2026-10-28",
    "day": "Wednesday",
    "start_time": "15:00",
    "end_time": "16:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-19",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Experimental (Interventional) Studies-I",
    "faculty": "Dr. Priyamadhaba Behera",
    "room": "LT-1",
    "date": "2026-10-31",
    "day": "Saturday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-20",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Experimental (Interventional) Studies-II",
    "faculty": "Dr. Priyamadhaba Behera",
    "room": "LT-1",
    "date": "2026-11-04",
    "day": "Wednesday",
    "start_time": "15:00",
    "end_time": "16:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-21",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Epidemiology Revision",
    "faculty": "Dr. Priyamadhaba Behera",
    "room": "LT-1",
    "date": "2026-11-07",
    "day": "Saturday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-22",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Association & Causation of Disease",
    "faculty": "Dr. Priyamadhaba Behera",
    "room": "LT-1",
    "date": "2026-11-11",
    "day": "Wednesday",
    "start_time": "15:00",
    "end_time": "16:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-23",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Infectious disease epidemiology & dynamics of disease transmission",
    "faculty": "Dr. Priyamadhaba Behera",
    "room": "LT-1",
    "date": "2026-11-14",
    "day": "Saturday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-24",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Host defence with immunising agents and NIS",
    "faculty": "Dr. Abhisek Mishra",
    "room": "LT-1",
    "date": "2026-11-18",
    "day": "Wednesday",
    "start_time": "15:00",
    "end_time": "16:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-25",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "AEFI Types and its Investigation. Special vaccine drives (like Pulse Polio campaign)",
    "faculty": "Dr. Abhisek Mishra",
    "room": "LT-1",
    "date": "2026-11-21",
    "day": "Saturday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-26",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Investigation of epidemics, Epidemiological Surveys",
    "faculty": "Dr. Manish Taywade",
    "room": "LT-1",
    "date": "2026-11-25",
    "day": "Wednesday",
    "start_time": "15:00",
    "end_time": "16:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-27",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Screening (Concept of screening and lead time, Evaluation of screening test)",
    "faculty": "Dr. Manish Taywade",
    "room": "LT-1",
    "date": "2026-11-28",
    "day": "Saturday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-28",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Revision",
    "faculty": "Dr. Abhisek Mishra",
    "room": "LT-1",
    "date": "2026-12-02",
    "day": "Wednesday",
    "start_time": "15:00",
    "end_time": "16:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-29",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Nutrition -I (Introduction, Major Foods & their nutritive value)",
    "faculty": "Dr. Manish Taywade",
    "room": "LT-1",
    "date": "2026-12-05",
    "day": "Saturday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-30",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Nutrition – II (Nutrition requirements of special groups)",
    "faculty": "Dr. Prajna Paramita Giri",
    "room": "LT-1",
    "date": "2026-12-09",
    "day": "Wednesday",
    "start_time": "15:00",
    "end_time": "16:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-31",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Nutrition -III (Nutritional deficiency diseases of public health importance)",
    "faculty": "Dr. Prajna Paramita Giri",
    "room": "LT-1",
    "date": "2026-12-12",
    "day": "Saturday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-32",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Nutrition - IV (Nutrition Assessment & Surveillance)",
    "faculty": "Dr. Manish Taywade",
    "room": "LT-1",
    "date": "2026-12-16",
    "day": "Wednesday",
    "start_time": "15:00",
    "end_time": "16:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-33",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Nutrition-V (Food Hygiene--Milk & Meat Hygiene)",
    "faculty": "Dr. Manish Taywade",
    "room": "LT-1",
    "date": "2026-12-19",
    "day": "Saturday",
    "start_time": "09:00",
    "end_time": "10:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  },
  {
    "id": "cmfm-34",
    "department": "Community Medicine",
    "subject": "Community Medicine",
    "class_type": "Theory",
    "topic": "Revision",
    "faculty": "Dr. Priyamadhaba Behera",
    "room": "LT-1",
    "date": "2026-12-23",
    "day": "Wednesday",
    "start_time": "15:00",
    "end_time": "16:00",
    "group": "all",
    "notes": "Dept. of CM & FM • 3rd Semester MBBS Batch 2025 • LT-1"
  }
];

/* ---------- APPLICATION STATE ---------- */
let allEvents       = [];
// Base reference Monday: Week 1 of September 2026 (starting Monday 31 Aug 2026)
// Dynamic reference Monday based on current date
const _now = new Date();
const _dow = (_now.getDay() + 6) % 7;
// Base reference Monday: Week 0 of 3rd Semester (Starting Monday 24 Aug 2026)
const BASE_MONDAY   = new Date(2026, 7, 24); // 24 Aug 2026 (Month is 0-indexed: 7 = Aug)

function calculateCurrentWeekOffset() {
  const now = new Date();
  const dow = (now.getDay() + 6) % 7;
  const currentMonday = new Date(now);
  currentMonday.setDate(now.getDate() - dow);
  currentMonday.setHours(0, 0, 0, 0);

  const base = new Date(BASE_MONDAY);
  base.setHours(0, 0, 0, 0);

  const diffMs = currentMonday.getTime() - base.getTime();
  const calculatedOffset = Math.round(diffMs / (7 * 24 * 60 * 60 * 1000));

  // If user date is within August - December 2026 weeks (0 to 18), use it:
  if (calculatedOffset >= 0 && calculatedOffset <= 18) {
    return calculatedOffset;
  }
  // Default to Week 1 (start of September 2026) where core teaching is in full swing
  return 1;
}

/**
 * Resolves the default view mode:
 * Default view is the 7-day Timetable Grid matrix.
 */
function getDefaultViewMode() {
  return 'grid';
}

let weekOffset      = calculateCurrentWeekOffset(); // Automatically defaults to today!
let activeDept      = 'all';
let activeType      = 'all';
let activeCohort    = 'all';
let activeView      = getDefaultViewMode(); // Defaults to grid on mobile!
let searchQuery     = '';
let activeEvent     = null;
let calViewDate     = new Date(2026, 8, 1);  // September 2026 (8 = Sep)
let calSelectedDate = toDateKey(new Date());

/* ---------- UTILITY FUNCTIONS ---------- */
function toMinutes(timeStr) {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function formatTime(timeStr) {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour   = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${suffix}`;
}

function parseDate(dateStr) {
  if (!dateStr) return new Date();
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatShortDate(date) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function formatNiceDate(dateInput) {
  if (!dateInput) return '';
  const d = (typeof dateInput === 'string') ? parseDate(dateInput) : dateInput;
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
}

function getWeekStart(offset = 0) {
  const d = new Date(BASE_MONDAY);
  d.setDate(d.getDate() + (offset * 7));
  d.setHours(0, 0, 0, 0);
  return d;
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m] || m));
}

/**
 * Updates the persistent Today Banner at top of page
 */
function updateTodayBanner() {
  const banner = document.getElementById('today-callout-banner');
  if (!banner) return;

  const now = new Date();
  const todayKey = toDateKey(now);
  const dateStr = now.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const dateEl = document.getElementById('today-banner-date');
  if (dateEl) dateEl.textContent = dateStr;

  const todayClasses = allEvents.filter(e => e.date === todayKey);
  const statusEl = document.getElementById('today-banner-status');
  if (statusEl) {
    if (todayClasses.length > 0) {
      statusEl.textContent = `${todayClasses.length} ${todayClasses.length === 1 ? 'class' : 'classes'} today`;
      statusEl.className = 'today-status-badge has-classes';
    } else {
      statusEl.textContent = 'No classes today';
      statusEl.className = 'today-status-badge no-classes';
    }
  }
}

/**
 * Scrolls smoothly to today's card block (Agenda) or today's column (Grid)
 */
function scrollToToday(smooth = true) {
  const behavior = smooth ? 'smooth' : 'auto';

  if (activeView === 'agenda') {
    const todayBlock = document.getElementById('agenda-today-card') || document.querySelector('.agenda-day-block.is-today-block');
    if (todayBlock) {
      todayBlock.scrollIntoView({ behavior, block: 'start' });
      todayBlock.classList.remove('pulse-highlight');
      void todayBlock.offsetWidth;
      todayBlock.classList.add('pulse-highlight');
    }
  } else if (activeView === 'grid') {
    const todayCol = document.querySelector('.grid-day-header.is-today-col');
    const gridContainer = document.getElementById('grid-view-container');
    if (todayCol && gridContainer) {
      const timeColWidth = window.innerWidth <= 768 ? 50 : 60;
      const scrollTarget = todayCol.offsetLeft - timeColWidth;
      gridContainer.scrollTo({ left: Math.max(0, scrollTarget), behavior });
      if (todayCol.dataset.dayIndex !== undefined) {
        const idx = parseInt(todayCol.dataset.dayIndex, 10);
        document.querySelectorAll('#grid-day-jump-strip .day-jump-chip').forEach(b => {
          b.classList.toggle('active', parseInt(b.dataset.dayIdx, 10) === idx);
        });
      }
    }
  }
}

/* ---------- FILTERING ENGINE ---------- */
function filterEvents(eventsList) {
  return eventsList.filter(evt => {
    // 1. Department Filter
    if (activeDept !== 'all' && evt.department !== activeDept) return false;

    // 2. Class Type Filter (Theory vs Practical)
    if (activeType !== 'all' && evt.class_type !== activeType) return false;

    // 3. Cohort Filter (Group A vs Group B)
    if (activeCohort !== 'all') {
      if (evt.class_type === 'Practical') {
        if (evt.group !== activeCohort) return false;
      }
    }

    // 4. Search Query Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const topicMatch   = (evt.topic || '').toLowerCase().includes(q);
      const facultyMatch = (evt.faculty || '').toLowerCase().includes(q);
      const deptMatch    = (evt.department || '').toLowerCase().includes(q);
      const roomMatch    = (evt.room || '').toLowerCase().includes(q);
      if (!topicMatch && !facultyMatch && !deptMatch && !roomMatch) return false;
    }

    return true;
  });
}

function getVisibleEventsThisWeek(weekStart) {
  const weekEnd = addDays(weekStart, 6);
  const startKey = toDateKey(weekStart);
  const endKey   = toDateKey(weekEnd);

  const filtered = filterEvents(allEvents);
  return filtered.filter(evt => {
    if (!evt.date) return false;
    return evt.date >= startKey && evt.date <= endKey;
  });
}

/* ---------- RENDER VIEWS ---------- */
function renderAllViews() {
  const weekStart = getWeekStart(weekOffset);
  const weekEnd   = addDays(weekStart, 6);
  const today     = new Date();
  today.setHours(0, 0, 0, 0);

  // 1. Update Week Label in Navbar
  const weekLabelEl = document.getElementById('week-label');
  if (weekLabelEl) {
    const yStart = weekStart.getFullYear();
    const yEnd   = weekEnd.getFullYear();
    const yearStr = (yStart === yEnd) ? yStart : `${yStart} – ${yEnd}`;
    weekLabelEl.textContent = `${formatShortDate(weekStart)} – ${formatShortDate(weekEnd)}, ${yearStr}`;
  }

  // 2. Filter Events for this week
  const visibleEvents = getVisibleEventsThisWeek(weekStart);
  const totalFiltered = filterEvents(allEvents);

  // 3. Update Counter Pill
  const countPill = document.getElementById('session-count-pill');
  if (countPill) {
    countPill.textContent = `Showing ${visibleEvents.length} this week (${totalFiltered.length} total)`;
  }

  // 4. Render Grid & Agenda Views
  renderGridView(visibleEvents, weekStart, today);
  renderAgendaView(visibleEvents, weekStart, today);

  // 5. Toggle View Containers
  const gridSectionWrap     = document.getElementById('grid-section-wrap');
  const agendaSectionWrap   = document.getElementById('agenda-section-wrap');
  const gridSectionHeader   = document.getElementById('grid-section-header');
  const agendaSectionHeader = document.getElementById('agenda-section-header');
  const emptyState          = document.getElementById('empty-state');

  if (activeView === 'grid') {
    gridSectionWrap?.classList.remove('hidden');
    agendaSectionWrap?.classList.add('hidden');
    gridSectionHeader?.classList.add('hidden');
    agendaSectionHeader?.classList.add('hidden');
  } else if (activeView === 'both') {
    gridSectionWrap?.classList.remove('hidden');
    agendaSectionWrap?.classList.remove('hidden');
    gridSectionHeader?.classList.remove('hidden');
    agendaSectionHeader?.classList.remove('hidden');
  } else {
    // Default 'agenda'
    gridSectionWrap?.classList.add('hidden');
    agendaSectionWrap?.classList.remove('hidden');
    gridSectionHeader?.classList.add('hidden');
    agendaSectionHeader?.classList.add('hidden');
  }

  // Sync View Switcher Buttons
  document.querySelectorAll('#view-mode-selector .segmented-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.view === activeView);
  });

  // 6. Handle Empty State
  if (emptyState) {
    if (visibleEvents.length === 0) {
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
    }
  }
}

/** Render Timetable Grid (8:00 AM - 6:00 PM) */
function renderGridView(visibleEvents, weekStart, today) {
  const grid = document.getElementById('timetable-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const weekDayDates = DAYS.map((_, i) => addDays(weekStart, i));

  // Top-left Corner Cell
  const corner = document.createElement('div');
  corner.className = 'grid-corner-cell';
  corner.textContent = 'TIME';
  grid.appendChild(corner);

  // 7 Day Headers
  DAYS.forEach((day, i) => {
    const dayDate = weekDayDates[i];
    const isToday = (dayDate.toDateString() === today.toDateString());

    const header = document.createElement('div');
    header.className = `grid-day-header${isToday ? ' is-today-col' : ''}`;
    header.dataset.dayIndex = i;
    header.dataset.date = toDateKey(dayDate);
    header.innerHTML = `
      <div class="grid-day-name">${DAY_SHORT[i]}</div>
      <div class="grid-day-date">${formatShortDate(dayDate)}</div>
    `;
    grid.appendChild(header);
  });

  // Sync mobile day jump strip active indicator
  const todayIdx = weekDayDates.findIndex(d => d.toDateString() === today.toDateString());
  const initialActiveIdx = (todayIdx !== -1) ? todayIdx : 0;
  document.querySelectorAll('#grid-day-jump-strip .day-jump-chip').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.dayIdx, 10) === initialActiveIdx);
  });

  // Hour Rows (8 to 17)
  for (let h = GRID_START; h < GRID_END; h++) {
    const timeLabel = document.createElement('div');
    timeLabel.className = 'time-slot-label';
    timeLabel.style.height = `${SLOT_HEIGHT}px`;
    timeLabel.textContent = `${String(h).padStart(2, '0')}:00`;
    grid.appendChild(timeLabel);

    DAYS.forEach((day, i) => {
      const dayDate = weekDayDates[i];
      const isToday = (dayDate.toDateString() === today.toDateString());

      const cell = document.createElement('div');
      cell.className = `grid-day-cell${isToday ? ' is-today-col' : ''}`;
      cell.style.height = `${SLOT_HEIGHT}px`;
      cell.dataset.day = day;
      cell.dataset.hour = h;
      cell.dataset.date = toDateKey(dayDate);
      grid.appendChild(cell);
    });
  }

  // Place Event Cards on the Grid
  visibleEvents.forEach(evt => {
    const startMin = toMinutes(evt.start_time);
    const endMin   = toMinutes(evt.end_time);

    if (startMin < GRID_START * 60 || endMin > (GRID_END + 1) * 60 || endMin <= startMin) return;

    const startHour = Math.floor(startMin / 60);
    const minuteWithinHour = startMin % 60;
    const durationMinutes  = endMin - startMin;

    const topPx    = (minuteWithinHour / 60) * SLOT_HEIGHT + 2;
    const heightPx = Math.max((durationMinutes / 60) * SLOT_HEIGHT - 4, 38);

    const cellSelector = `[data-date="${evt.date}"][data-hour="${startHour}"]`;
    const anchorCell = grid.querySelector(cellSelector);
    if (!anchorCell) return;

    const theme = getDeptTheme(evt.department);
    const card = document.createElement('div');
    card.className = 'grid-event-card';
    card.style.setProperty('--card-accent', theme.accent);
    card.style.setProperty('--card-bg', theme.bg);
    card.style.setProperty('--card-border', theme.border);
    card.style.setProperty('--card-text', theme.text);
    card.style.top = `${topPx}px`;
    card.style.height = `${heightPx}px`;

    card.innerHTML = `
      <div class="card-top-tag">${escapeHtml(theme.short)} • ${escapeHtml(evt.class_type)}</div>
      <div class="card-topic-line">${escapeHtml(evt.topic)}</div>
      ${heightPx >= 52 ? `<div class="card-faculty-line">👨‍⚕️ ${escapeHtml(evt.faculty)}</div>` : ''}
    `;

    card.addEventListener('click', (e) => {
      e.stopPropagation();
      openDetailModal(evt, theme, evt.day);
    });

    anchorCell.appendChild(card);
  });
}

/** Render Mobile Agenda View (Card Stream) */
function renderAgendaView(visibleEvents, weekStart, today) {
  const container = document.getElementById('agenda-view-container');
  if (!container) return;
  container.innerHTML = '';

  const weekDayDates = DAYS.map((_, i) => addDays(weekStart, i));

  weekDayDates.forEach((dayDate, i) => {
    const dateKey = toDateKey(dayDate);
    const dayName = DAYS[i];
    const isToday = (dayDate.toDateString() === today.toDateString());

    const dayEvents = visibleEvents.filter(e => e.date === dateKey);
    if (dayEvents.length === 0) return; // Only show days with classes in this view

    // Sort by start time
    dayEvents.sort((a, b) => toMinutes(a.start_time) - toMinutes(b.start_time));

    const dayBlock = document.createElement('div');
    dayBlock.className = `agenda-day-block${isToday ? ' is-today-block' : ''}`;
    if (isToday) {
      dayBlock.id = 'agenda-today-card';
    }

    const header = document.createElement('div');
    header.className = 'agenda-day-header';
    header.innerHTML = `
      <div class="agenda-day-title">
        <span>${formatNiceDate(dayDate)}</span>
        ${isToday ? `<span class="agenda-today-tag">🔴 TODAY</span>` : ''}
      </div>
      <div class="agenda-day-count">${dayEvents.length} ${dayEvents.length === 1 ? 'class' : 'classes'}</div>
    `;
    dayBlock.appendChild(header);

    const cardsList = document.createElement('div');
    cardsList.className = 'agenda-cards-list';

    dayEvents.forEach(evt => {
      const theme = getDeptTheme(evt.department);
      const isPractical = (evt.class_type === 'Practical');

      const card = document.createElement('div');
      card.className = 'agenda-event-card';
      card.style.setProperty('--card-accent', theme.accent);
      card.style.setProperty('--card-bg', theme.bg);
      card.style.setProperty('--card-border', theme.border);
      card.style.setProperty('--card-text', theme.text);

      card.innerHTML = `
        <div class="agenda-main-col">
          <div class="agenda-meta-row">
            <span class="dept-pill" style="background:${theme.bg}; color:${theme.text}; border:1px solid ${theme.border};">
              ${escapeHtml(theme.short)}
            </span>
            <span class="type-pill ${isPractical ? 'practical' : 'theory'}">
              ${isPractical ? '🔬 Practical' : '📚 Theory'}
            </span>
            ${evt.group && evt.group !== 'all' ? `<span class="cohort-pill">${escapeHtml(evt.group)}</span>` : ''}
          </div>
          <h4 class="agenda-topic-title">${escapeHtml(evt.topic)}</h4>
          <div class="agenda-faculty-line">
            <span>👨‍⚕️</span>
            <span class="agenda-faculty-name">${escapeHtml(evt.faculty)}</span>
          </div>
        </div>

        <div class="agenda-side-col">
          <div class="agenda-time-pill">${formatTime(evt.start_time)} – ${formatTime(evt.end_time)}</div>
          <div class="agenda-venue-pill">📍 ${escapeHtml(evt.room || 'LT-1')}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        openDetailModal(evt, theme, dayName);
      });

      cardsList.appendChild(card);
    });

    dayBlock.appendChild(cardsList);
    container.appendChild(dayBlock);
  });
}

/* ---------- EVENT DETAIL MODAL ---------- */
function openDetailModal(evt, theme, dayName) {
  activeEvent = evt;
  const isPractical = (evt.class_type === 'Practical');

  document.getElementById('modal-color-bar').style.background = theme.accent;

  const deptBadge = document.getElementById('modal-dept-badge');
  deptBadge.textContent = evt.department;
  deptBadge.style.background = theme.bg;
  deptBadge.style.color = theme.text;
  deptBadge.style.border = `1px solid ${theme.border}`;

  const typeBadge = document.getElementById('modal-type-badge');
  typeBadge.textContent = isPractical ? '🔬 Practical Session' : '📚 Theory Lecture';
  typeBadge.className = `modal-badge ${isPractical ? 'type-practical' : 'type-theory'}`;

  const cohortBadge = document.getElementById('modal-cohort-badge');
  if (evt.group && evt.group !== 'all') {
    cohortBadge.textContent = evt.group;
    cohortBadge.classList.remove('hidden');
  } else {
    cohortBadge.classList.add('hidden');
  }

  document.getElementById('modal-topic-title').textContent = evt.topic || 'Class Session';
  document.getElementById('modal-faculty-val').textContent = evt.faculty || 'Faculty Member';
  
  const niceDate = evt.date ? formatNiceDate(evt.date) : (dayName || '');
  document.getElementById('modal-time-val').textContent = `${niceDate} • ${formatTime(evt.start_time)} – ${formatTime(evt.end_time)}`;
  document.getElementById('modal-venue-val').textContent = evt.room || 'Lecture Theatre 3 (LT-1)';
  document.getElementById('modal-notes-val').textContent = evt.notes || 'AIIMS Bhubaneswar MBBS Batch 2025';

  // Build Google Calendar Web Link
  const gcalBtn = document.getElementById('modal-gcal-link');
  if (gcalBtn && evt.date && evt.start_time && evt.end_time) {
    const startIso = evt.date.replace(/-/g, '') + 'T' + evt.start_time.replace(/:/g, '') + '00';
    const endIso   = evt.date.replace(/-/g, '') + 'T' + evt.end_time.replace(/:/g, '') + '00';
    const text     = encodeURIComponent(`[${evt.department}] ${evt.topic}`);
    const details  = encodeURIComponent(`Faculty: ${evt.faculty}\nRoom: ${evt.room}\nDetails: ${evt.notes}`);
    const location = encodeURIComponent(`${evt.room || 'LT-1'}, AIIMS Bhubaneswar`);
    gcalBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  }

  document.getElementById('event-detail-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
  document.getElementById('event-detail-modal').classList.add('hidden');
  document.body.style.overflow = '';
  activeEvent = null;
}

/* ---------- MONTHLY CALENDAR MODAL ---------- */
function openCalendarModal() {
  calViewDate = new Date(2026, 8, 1); // Set to September 2026
  renderMonthlyCalendar();
  document.getElementById('calendar-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCalendarModal() {
  document.getElementById('calendar-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

function renderMonthlyCalendar() {
  const grid = document.getElementById('cal-days-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const year  = calViewDate.getFullYear();
  const month = calViewDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();

  // First day of week (Monday = 0)
  const firstDow = (firstDay.getDay() + 6) % 7;

  // Blank padding cells for days before the 1st
  for (let b = 0; b < firstDow; b++) {
    const blank = document.createElement('div');
    blank.className = 'cal-day-cell is-empty';
    grid.appendChild(blank);
  }

  // Active month cells
  for (let d = 1; d <= totalDays; d++) {
    const dayDate = new Date(year, month, d);
    const dateKey = toDateKey(dayDate);
    const dayClasses = allEvents.filter(e => e.date === dateKey);

    const cell = document.createElement('div');
    cell.className = 'cal-day-cell';
    if (dateKey === calSelectedDate) cell.classList.add('is-selected');

    // Build department dot indicators
    let dotsHtml = '';
    const distinctDepts = [...new Set(dayClasses.map(e => e.department))];
    distinctDepts.slice(0, 4).forEach(dept => {
      const theme = getDeptTheme(dept);
      dotsHtml += `<span class="cal-dot" style="background:${theme.accent};"></span>`;
    });

    cell.innerHTML = `
      <span class="cal-day-num">${d}</span>
      <div class="cal-dots-row">${dotsHtml}</div>
    `;

    cell.addEventListener('click', () => {
      document.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('is-selected'));
      cell.classList.add('is-selected');
      calSelectedDate = dateKey;
      inspectCalendarDate(dateKey, dayClasses);
    });

    grid.appendChild(cell);
  }

  // Default inspector to 1st September or current selection
  const initialSelection = allEvents.filter(e => e.date === calSelectedDate);
  inspectCalendarDate(calSelectedDate, initialSelection);
}

function inspectCalendarDate(dateKey, dayClasses) {
  const labelEl = document.getElementById('inspector-date-label');
  const subEl   = document.getElementById('inspector-date-sub');
  const countEl = document.getElementById('inspector-count-badge');
  const listEl  = document.getElementById('inspector-list');

  const parsed = parseDate(dateKey);
  if (labelEl) labelEl.textContent = formatNiceDate(parsed);
  if (subEl) subEl.textContent = `${dayClasses.length} ${dayClasses.length === 1 ? 'class session' : 'class sessions'} scheduled`;
  if (countEl) countEl.textContent = `${dayClasses.length} Classes`;

  if (listEl) {
    listEl.innerHTML = '';
    if (dayClasses.length === 0) {
      listEl.innerHTML = `<p class="inspector-empty-text">No lectures or practical postings on this date.</p>`;
      return;
    }

    dayClasses.sort((a, b) => toMinutes(a.start_time) - toMinutes(b.start_time));
    dayClasses.forEach(evt => {
      const theme = getDeptTheme(evt.department);
      const item = document.createElement('div');
      item.className = 'inspector-item';
      item.style.setProperty('--card-accent', theme.accent);
      item.innerHTML = `
        <div style="flex:1;">
          <div class="inspector-item-main">[${escapeHtml(theme.short)}] ${escapeHtml(evt.topic)}</div>
          <div style="font-size:0.7rem; color:#64748B;">👨‍⚕️ ${escapeHtml(evt.faculty)} • 📍 ${escapeHtml(evt.room || 'LT-1')}</div>
        </div>
        <div class="inspector-item-time">${formatTime(evt.start_time)} – ${formatTime(evt.end_time)}</div>
      `;
      item.addEventListener('click', () => {
        closeCalendarModal();
        jumpToDate(evt.date);
        openDetailModal(evt, theme, evt.day);
      });
      listEl.appendChild(item);
    });
  }
}

/* ---------- DATE JUMP & FINDER ENGINE ---------- */
function jumpToDate(targetDateStr) {
  if (!targetDateStr) return;
  const targetDate = parseDate(targetDateStr);
  const dow = (targetDate.getDay() + 6) % 7;
  const targetMonday = new Date(targetDate);
  targetMonday.setDate(targetDate.getDate() - dow);
  targetMonday.setHours(0, 0, 0, 0);

  const diffMs = targetMonday.getTime() - BASE_MONDAY.getTime();
  const diffWeeks = Math.round(diffMs / (7 * 24 * 60 * 60 * 1000));
  weekOffset = diffWeeks;

  renderAllViews();
}

/* ---------- SEARCH ENGINE ---------- */
function handleKeywordSearch(query) {
  searchQuery = (query || '').trim();
  const banner = document.getElementById('search-status-banner');
  const bannerText = document.getElementById('search-status-text');
  const clearBtn = document.getElementById('clear-search-btn');

  if (clearBtn) {
    clearBtn.classList.toggle('hidden', !searchQuery);
  }

  if (searchQuery) {
    const matches = filterEvents(allEvents);
    if (banner && bannerText) {
      bannerText.textContent = `Found ${matches.length} classes matching "${searchQuery}"`;
      banner.classList.remove('hidden');
    }
  } else {
    if (banner) banner.classList.add('hidden');
  }

  renderAllViews();
}

/* ---------- GITHUB & PRINT MODALS ---------- */
function openGitHubModal() {
  document.getElementById('github-modal')?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeGitHubModal() {
  document.getElementById('github-modal')?.classList.add('hidden');
  document.body.style.overflow = '';
}

/* ==========================================================================
   CLASS NOTIFICATION & REMINDER SYSTEM
   ========================================================================== */
const REMINDER_SETTINGS_KEY = 'aiims_batch2025_reminder_settings';
let reminderSettings = {
  enabled: true, // Default to enabled for students
  leadTime: 10,  // 10 minutes before class
  sound: true
};

let notifiedEventsMap = {};
let toastTimer = null;
let reminderTimer = null;

function loadReminderSettings() {
  try {
    const raw = localStorage.getItem(REMINDER_SETTINGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      reminderSettings = { ...reminderSettings, ...parsed };
    }
  } catch (e) {}
  updateReminderUI();
}

function saveReminderSettings() {
  try {
    localStorage.setItem(REMINDER_SETTINGS_KEY, JSON.stringify(reminderSettings));
  } catch (e) {}
  updateReminderUI();
}

function updateReminderUI() {
  const dot = document.getElementById('notif-header-dot');
  if (dot) {
    dot.classList.toggle('active', !!reminderSettings.enabled);
  }

  const masterToggle = document.getElementById('notif-master-toggle');
  if (masterToggle) {
    masterToggle.checked = !!reminderSettings.enabled;
  }

  const leadSelect = document.getElementById('notif-lead-time');
  if (leadSelect) {
    leadSelect.value = String(reminderSettings.leadTime || 10);
  }

  const soundToggle = document.getElementById('notif-sound-toggle');
  if (soundToggle) {
    soundToggle.checked = !!reminderSettings.sound;
  }

  updatePermissionBadge();
}

function updatePermissionBadge() {
  const badge = document.getElementById('notif-permission-badge');
  if (!badge) return;

  if (!('Notification' in window)) {
    badge.textContent = 'In-App Alerts Only';
    badge.className = 'modal-badge notif-perm-badge default';
    return;
  }

  if (Notification.permission === 'granted') {
    badge.textContent = 'Permission Granted';
    badge.className = 'modal-badge notif-perm-badge granted';
  } else if (Notification.permission === 'denied') {
    badge.textContent = 'Permission Blocked';
    badge.className = 'modal-badge notif-perm-badge denied';
  } else {
    badge.textContent = 'Click to Enable';
    badge.className = 'modal-badge notif-perm-badge default';
  }
}

/**
 * Plays a gentle harmonic two-tone medical chime using Web Audio API
 */
function playReminderChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now); // A5
    osc1.frequency.exponentialRampToValueAtTime(1108, now + 0.15); // C#6

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1108, now + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(1320, now + 0.3); // E6

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now + 0.1);
    osc1.stop(now + 0.65);
    osc2.stop(now + 0.65);
  } catch (e) {
    console.log('Chime sound note:', e);
  }
}

/**
 * Shows an animated in-app toast notification
 */
function showInAppToast(title, body) {
  const toast = document.getElementById('toast-notification');
  const titleEl = document.getElementById('toast-title');
  const bodyEl = document.getElementById('toast-body');
  if (!toast) return;

  if (titleEl) titleEl.textContent = title;
  if (bodyEl) bodyEl.textContent = body;

  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 8000);
}

/**
 * Sends a notification via Browser Notifications API, In-App Toast, and Sound Chime
 */
function sendClassNotification(title, body, tag = 'class-alert') {
  if (reminderSettings.sound) {
    playReminderChime();
  }

  showInAppToast(title, body);

  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      const n = new Notification(title, {
        body: body,
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%231E3A8A"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
        tag: tag,
        requireInteraction: true
      });
      n.onclick = () => {
        window.focus();
        n.close();
      };
    } catch (err) {
      console.warn('Native notification issue:', err);
    }
  }
}

/**
 * Periodic checker that evaluates upcoming classes and dispatches pre-class notifications
 */
function checkUpcomingClasses() {
  const now = new Date();
  const todayKey = toDateKey(now);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  if (reminderSettings.enabled) {
    const todayEvents = allEvents.filter(e => e.date === todayKey);
    const leadMin = parseInt(reminderSettings.leadTime, 10) || 10;

    todayEvents.forEach(evt => {
      const startMin = toMinutes(evt.start_time);
      const triggerMin = startMin - leadMin;
      const notifKey = `aiims_notif_${evt.id}_${todayKey}_${leadMin}`;

      if (currentMinutes >= triggerMin && currentMinutes < startMin) {
        let alreadyFired = notifiedEventsMap[notifKey];
        if (!alreadyFired) {
          try {
            alreadyFired = localStorage.getItem(notifKey) === '1';
          } catch(e) {}
        }

        if (!alreadyFired) {
          notifiedEventsMap[notifKey] = true;
          try { localStorage.setItem(notifKey, '1'); } catch(e) {}

          const minsLeft = startMin - currentMinutes;
          const timeLabel = minsLeft <= 1 ? 'starting right now' : `starting in ${minsLeft} minutes`;
          const title = `🔔 Class Reminder (${evt.subject || evt.department})`;
          const body = `${evt.topic}\n⏰ ${timeLabel} (${formatTime(evt.start_time)})\n📍 ${evt.room || 'LT-1'} • 👨‍⚕️ ${evt.faculty}`;

          sendClassNotification(title, body, `class-${evt.id}`);
        }
      }
    });
  }

  updateNextClassDisplay();
}

/**
 * Finds next upcoming class and renders details in the reminder modal
 */
function updateNextClassDisplay() {
  const topicEl = document.getElementById('next-class-topic');
  const metaEl  = document.getElementById('next-class-meta');
  const tagEl   = document.getElementById('next-class-tag');
  if (!topicEl || !metaEl) return;

  const now = new Date();
  const todayKey = toDateKey(now);
  const currentMin = now.getHours() * 60 + now.getMinutes();

  // 1. Look for remaining classes today
  const todayFuture = allEvents
    .filter(e => e.date === todayKey && toMinutes(e.start_time) > currentMin)
    .sort((a, b) => toMinutes(a.start_time) - toMinutes(b.start_time));

  if (todayFuture.length > 0) {
    const nextEvt = todayFuture[0];
    const diffMin = toMinutes(nextEvt.start_time) - currentMin;
    const hours = Math.floor(diffMin / 60);
    const mins = diffMin % 60;
    const timeUntilStr = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

    if (tagEl) tagEl.textContent = `NEXT CLASS TODAY • STARTS IN ${timeUntilStr.toUpperCase()}`;
    topicEl.textContent = `[${nextEvt.subject || nextEvt.department}] ${nextEvt.topic}`;
    metaEl.textContent = `⏰ Today at ${formatTime(nextEvt.start_time)} • 📍 ${nextEvt.room || 'LT-1'} • 👨‍⚕️ ${nextEvt.faculty}`;
    return;
  }

  // 2. Look for future classes after today
  const upcomingEvents = allEvents
    .filter(e => e.date > todayKey)
    .sort((a, b) => a.date.localeCompare(b.date) || (toMinutes(a.start_time) - toMinutes(b.start_time)));

  if (upcomingEvents.length > 0) {
    const nextEvt = upcomingEvents[0];
    if (tagEl) tagEl.textContent = `UPCOMING CLASS • ${formatNiceDate(nextEvt.date).toUpperCase()}`;
    topicEl.textContent = `[${nextEvt.subject || nextEvt.department}] ${nextEvt.topic}`;
    metaEl.textContent = `📅 ${formatNiceDate(nextEvt.date)} at ${formatTime(nextEvt.start_time)} • 📍 ${nextEvt.room || 'LT-1'} • 👨‍⚕️ ${nextEvt.faculty}`;
  } else {
    if (tagEl) tagEl.textContent = 'SEMESTER SCHEDULE COMPLETE';
    topicEl.textContent = 'No more classes scheduled for this period';
    metaEl.textContent = 'All Scheduled teaching sessions concluded.';
  }
}

function openReminderModal() {
  loadReminderSettings();
  updateNextClassDisplay();
  document.getElementById('reminder-modal')?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeReminderModal() {
  document.getElementById('reminder-modal')?.classList.add('hidden');
  document.body.style.overflow = '';
}

/* ---------- PHONE CALENDAR SYNC (.ICS EXPORT) ---------- */
function pad(n) { return String(n).padStart(2, '0'); }

function toICSDate(dateStr, timeStr) {
  const [y, mo, d] = dateStr.split('-');
  const [h, m]     = timeStr.split(':');
  return `${y}${pad(mo)}${pad(d)}T${pad(h)}${pad(m)}00`;
}

function downloadICS() {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AIIMS Bhubaneswar//MBBS Batch 2025 Class Schedule//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:MBBS Batch 2025 AIIMS Bhubaneswar',
    'X-WR-TIMEZONE:Asia/Kolkata'
  ];

  const nowStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  allEvents.forEach((evt, idx) => {
    if (!evt.date || !evt.start_time || !evt.end_time) return;
    const dtStart = toICSDate(evt.date, evt.start_time);
    const dtEnd   = toICSDate(evt.date, evt.end_time);
    const summary = `[${evt.subject || evt.department}] ${evt.topic}`;
    const desc    = `Department: ${evt.department}\\nFaculty: ${evt.faculty}\\nTopic: ${evt.topic}\\nType: ${evt.class_type}\\nGroup: ${evt.group || 'All'}\\nVenue: ${evt.room || 'LT-1'}`;
    const loc     = `${evt.room || 'LT-1'}, AIIMS Bhubaneswar`;

    lines.push(
      'BEGIN:VEVENT',
      `UID:aiims-batch2025-${idx+1}-${evt.id || Date.now()}@aiimsbbsr`,
      `DTSTAMP:${nowStamp}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${desc}`,
      `LOCATION:${loc}`,
      `CATEGORIES:${evt.department},${evt.class_type}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:DISPLAY',
      `DESCRIPTION:Class Reminder: ${summary} in 15 mins`,
      'END:VALARM',
      'END:VEVENT'
    );
  });

  lines.push('END:VCALENDAR');
  const content = lines.join('\r\n');
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'aiims-mbbs-batch2025-schedule.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ---------- INITIALIZATION & EVENT LISTENERS ---------- */
async function initializeSchedule() {
  // Always initialize from embedded array first (instant offline/file:// guarantee)
  allEvents = [...EMBEDDED_SCHEDULE];

  // Try fetching live JSON for any live updates
  try {
    const res = await fetch('./schedule.json?t=' + Date.now());
    if (res.ok) {
      const data = await res.json();
      if (data && data.events && data.events.length > 0) {
        allEvents = data.events;
      }
    }
  } catch (err) {
    console.log('Using pre-bundled schedule dataset.');
  }

  // Establish default view (Mobile = Grid, Desktop = Agenda)
  activeView = getDefaultViewMode();

  updateTodayBanner();
  renderAllViews();

  // Initialize Class Notification Engine & Pre-Class Checker
  loadReminderSettings();
  checkUpcomingClasses();
  if (reminderTimer) clearInterval(reminderTimer);
  reminderTimer = setInterval(checkUpcomingClasses, 30000); // Check every 30 seconds

  // Smoothly position on today's classes on initial page load
  setTimeout(() => {
    scrollToToday(false);
  }, 120);
}

function bootApp() {
  initializeSchedule();

  // Week Navigation
  document.getElementById('prev-week')?.addEventListener('click', () => {
    weekOffset--;
    renderAllViews();
  });

  document.getElementById('next-week')?.addEventListener('click', () => {
    weekOffset++;
    renderAllViews();
  });

  // Jump directly to Present Date (Today)
  const jumpToTodaySchedule = () => {
    weekOffset = calculateCurrentWeekOffset();
    renderAllViews();
    scrollToToday(true);
  };
  document.getElementById('today-btn')?.addEventListener('click', jumpToTodaySchedule);
  document.getElementById('jump-today-btn')?.addEventListener('click', jumpToTodaySchedule);

  // View Switcher (Agenda vs Grid)
  document.querySelectorAll('#view-mode-selector .segmented-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#view-mode-selector .segmented-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeView = btn.dataset.view;
      renderAllViews();
      if (activeView === 'grid') {
        setTimeout(() => scrollToToday(true), 60);
      }
    });
  });

  // Simplified Department Filter Dropdown
  document.getElementById('dept-filter-select')?.addEventListener('change', (e) => {
    activeDept = e.target.value;
    renderAllViews();
  });

  // Secondary Filters Drawer Toggle
  const moreFiltersBtn = document.getElementById('toggle-more-filters-btn');
  const secDrawer = document.getElementById('secondary-filters-drawer');
  moreFiltersBtn?.addEventListener('click', () => {
    if (secDrawer) {
      const isHidden = secDrawer.classList.toggle('hidden');
      moreFiltersBtn.classList.toggle('active', !isHidden);
    }
  });

  // Session Type Dropdown Filter
  document.getElementById('type-filter-select')?.addEventListener('change', (e) => {
    activeType = e.target.value;
    renderAllViews();
  });

  // Practical Cohort Dropdown Filter
  document.getElementById('cohort-filter-select')?.addEventListener('change', (e) => {
    activeCohort = e.target.value;
    renderAllViews();
  });

  // Live Search
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => handleKeywordSearch(e.target.value));
  }
  document.getElementById('clear-search-btn')?.addEventListener('click', () => {
    if (searchInput) {
      searchInput.value = '';
      handleKeywordSearch('');
    }
  });
  document.getElementById('dismiss-search-btn')?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    handleKeywordSearch('');
  });

  // Reset Filters Button
  document.getElementById('reset-filters-btn')?.addEventListener('click', () => {
    activeDept   = 'all';
    activeType   = 'all';
    activeCohort = 'all';
    searchQuery  = '';
    if (searchInput) searchInput.value = '';
    const deptSelect = document.getElementById('dept-filter-select');
    if (deptSelect) deptSelect.value = 'all';
    const typeSelect = document.getElementById('type-filter-select');
    if (typeSelect) typeSelect.value = 'all';
    const cohortSelect = document.getElementById('cohort-filter-select');
    if (cohortSelect) cohortSelect.value = 'all';
    renderAllViews();
  });

  // Modals
  document.getElementById('modal-close')?.addEventListener('click', closeDetailModal);
  document.getElementById('modal-dismiss-btn')?.addEventListener('click', closeDetailModal);
  document.getElementById('event-detail-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'event-detail-modal') closeDetailModal();
  });

  document.getElementById('open-cal-modal-btn')?.addEventListener('click', openCalendarModal);
  document.getElementById('cal-modal-close')?.addEventListener('click', closeCalendarModal);
  document.getElementById('calendar-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'calendar-modal') closeCalendarModal();
  });

  document.getElementById('open-github-btn')?.addEventListener('click', openGitHubModal);
  document.getElementById('footer-github-btn')?.addEventListener('click', openGitHubModal);
  document.getElementById('github-modal-close')?.addEventListener('click', closeGitHubModal);
  document.getElementById('github-close-btn')?.addEventListener('click', closeGitHubModal);
  document.getElementById('github-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'github-modal') closeGitHubModal();
  });

  // ==================== REMINDER & NOTIFICATION LISTENERS ====================
  document.getElementById('open-notif-modal-btn')?.addEventListener('click', openReminderModal);
  document.getElementById('reminder-modal-close')?.addEventListener('click', closeReminderModal);
  document.getElementById('reminder-modal-dismiss')?.addEventListener('click', closeReminderModal);
  document.getElementById('reminder-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'reminder-modal') closeReminderModal();
  });

  document.getElementById('toast-close-btn')?.addEventListener('click', () => {
    document.getElementById('toast-notification')?.classList.add('hidden');
  });

  document.getElementById('notif-master-toggle')?.addEventListener('change', async (e) => {
    reminderSettings.enabled = e.target.checked;
    if (reminderSettings.enabled) {
      if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        const perm = await Notification.requestPermission();
        updatePermissionBadge();
        if (perm !== 'granted') {
          showInAppToast('In-App Alerts Active', 'Browser popup alerts were not enabled, but you will still receive in-app alert toasts & audio chimes.');
        } else {
          showInAppToast('Notifications Active', `You will receive alerts ${reminderSettings.leadTime || 10} minutes before every class.`);
        }
      }
    }
    saveReminderSettings();
    checkUpcomingClasses();
  });

  document.getElementById('notif-lead-time')?.addEventListener('change', (e) => {
    reminderSettings.leadTime = parseInt(e.target.value, 10) || 10;
    saveReminderSettings();
    checkUpcomingClasses();
  });

  document.getElementById('notif-sound-toggle')?.addEventListener('change', (e) => {
    reminderSettings.sound = e.target.checked;
    saveReminderSettings();
    if (reminderSettings.sound) {
      playReminderChime();
    }
  });

  document.getElementById('test-notif-btn')?.addEventListener('click', async () => {
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      await Notification.requestPermission();
      updatePermissionBadge();
    }
    const lead = reminderSettings.leadTime || 10;
    sendClassNotification(
      `🔔 Class in ${lead}m: Intestinal Infections`,
      `👨‍⚕️ Dr Swayam Pragyan Parida\n📍 LT-1 • ⏰ 8:00 AM – 9:00 AM\n(Test Notification Successful!)`,
      'test-notif'
    );
  });

  document.getElementById('reminder-modal-sync-btn')?.addEventListener('click', () => {
    closeReminderModal();
    downloadICS();
  });

  // Sync Phone Calendar (.ICS)
  document.getElementById('sync-phone-btn')?.addEventListener('click', downloadICS);
  document.getElementById('footer-sync-btn')?.addEventListener('click', downloadICS);

  // Mobile Grid Day Jump Buttons
  document.querySelectorAll('#grid-day-jump-strip .day-jump-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.dayIdx, 10);
      document.querySelectorAll('#grid-day-jump-strip .day-jump-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const gridContainer = document.getElementById('grid-view-container');
      if (gridContainer) {
        const header = gridContainer.querySelector(`.grid-day-header[data-day-index="${idx}"]`);
        if (header) {
          const timeColWidth = window.innerWidth <= 768 ? 50 : 60;
          const scrollTarget = header.offsetLeft - timeColWidth;
          gridContainer.scrollTo({ left: Math.max(0, scrollTarget), behavior: 'smooth' });
        }
      }
    });
  });

  // Track horizontal scroll in grid to update active day jump chip
  const gridOuter = document.getElementById('grid-view-container');
  if (gridOuter) {
    let scrollTimer;
    gridOuter.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const timeColWidth = window.innerWidth <= 768 ? 50 : 60;
        const currentLeft = gridOuter.scrollLeft + timeColWidth + 10;
        const headers = Array.from(gridOuter.querySelectorAll('.grid-day-header'));
        let activeIdx = 0;
        let minDiff = Infinity;
        headers.forEach((h) => {
          const diff = Math.abs(h.offsetLeft - currentLeft);
          if (diff < minDiff) {
            minDiff = diff;
            activeIdx = parseInt(h.dataset.dayIndex, 10);
          }
        });
        document.querySelectorAll('#grid-day-jump-strip .day-jump-chip').forEach(b => {
          b.classList.toggle('active', parseInt(b.dataset.dayIdx, 10) === activeIdx);
        });
      }, 60);
    }, { passive: true });
  }

  // Keyboard Shortcuts (Escape to dismiss, Arrow keys for weeks)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetailModal();
      closeCalendarModal();
      closeReminderModal();
      closeGitHubModal();
    } else if (e.altKey && e.key === 'ArrowLeft') {
      weekOffset--;
      renderAllViews();
    } else if (e.altKey && e.key === 'ArrowRight') {
      weekOffset++;
      renderAllViews();
    }
  });
}

// Guarantee execution whether DOM is already parsed or loading
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  bootApp();
}
