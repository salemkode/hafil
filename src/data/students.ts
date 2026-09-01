export type BatchId = 'cyberx' | 'brainware'

export interface Batch {
  id: BatchId
  name: string
  nameAr: string
  department: string
  tagline: string
  logo: string
  accent: string
}

export const BATCHES: Batch[] = [
  {
    id: 'cyberx',
    name: 'Cyber-X',
    nameAr: 'سايبر إكس',
    department: 'أمن المعلومات',
    tagline: 'حيث تبدأ الحماية من الوعي',
    logo: '/assets/cohorts/cyberx-transparent.png',
    accent: '#f02a4a',
  },
  {
    id: 'brainware',
    name: 'BrainWare',
    nameAr: 'برين وير',
    department: 'علوم الحاسوب',
    tagline: 'حيث تتحول الفكرة إلى أثر',
    logo: '/assets/cohorts/brainware-transparent.png',
    accent: '#32d5ff',
  },
]

export interface Student {
  name: string
  batch: BatchId
}

const cyberxNames = [
  'Talal Yeslam Badubbah',
  'Abdullah Saeed Swailem',
  'Mohammed Awadh Bin Haidarah',
  'Abdulatef Saeed Anber',
  'Salem Abdullah Hassaan',
  'Ahmed Abdullah Alhebshi',
  'Abdullah Khaled Ebrahim',
  'Hamzah Mohammed Shaiban',
  'Alhasan Salem Bani',
  'Abdullah Faisal Al-Ameri',
  'Mohammed Mubarak Al-Tamimi',
  'Abobakr Saeed Bokir',
  'Abdulbari Ahmed Al-Jabri',
  'Jamoh Abdulrahman Al-Akwaa',
  'Omar Obaid Baqatyan',
  'Fraj Ameen Bin Abdat',
  'Ali Yahya Bin Yahya',
  'Suliman Mahfodh Bazyad',
  'Abdullah Salem Amar',
  'Sakhr Khaled Alkoli',
  'Abobaker Salim Bafadel',
  'Osama Ahmed Al-Wahidy',
  'Abdulrahman Ali Basheeb',
  'Alwi Hasan Mola-Aldwillah',
  'Isra Mohammed Al-Arabi',
  'Nedaa Saeed Baabbad',
  'Esra Mohammed Maqsa',
  'Sabrin Mohammed Ba Gubair',
  'Zainab Ghazi Al-Saggaf',
  'Wala Abdulrahman Al-Zafeni',
  'Sarah Saleh Bajri',
  'Doaa Saeed Balfas',
  'Shoug Basem BinTaleb',
  'Munira Azzan Balfas',
]

const brainwareNames = [
  'Yousef Rajab Bazmol',
  'Gaafar Asem Bin Taleb',
  'Ahmed Saeed Bazuhair',
  'Mohammed Ali Alkaf',
  'Anas Mohammed Bokir',
  'Salem Mohammed Shammakh',
  'Mohammed Ali Alhabshi',
  'Abdullah Ali Tarshom',
  'Ali Zakarya Alkatheri',
  'Mohammed Mahmoud Basyoud',
  'Yousef Yaaqob Jarwan',
  'Abdullah Adel Abadi',
  'Bassam Hasan Binmadhi',
  'Ahmed Amin Albakry',
  'Fares Hasan Bin Madhi',
  'Emad Anees Binobeadeallah',
  'Wedyan Mohammed Elaiwah',
  'Heyam Shawqi Baatwah',
  'Mohammed Ameen Ausella',
]

export const STUDENTS: Student[] = [
  ...cyberxNames.map<Student>((name) => ({ name, batch: 'cyberx' })),
  ...brainwareNames.map<Student>((name) => ({ name, batch: 'brainware' })),
]

export const batchById = (id: BatchId): Batch => BATCHES.find((b) => b.id === id)!
