export const EVENT = {
  titleAr: 'حفل تخرّج BrainWare × Cyber-X',
  month: 'سبتمبر',
  day: '05',
  dayName: 'السبت',
  year: '2026',
  academicYear: '2025—2026',
  /** TODO: أكّد وقت بداية الحفل — الافتراضي 8 مساءً */
  targetDate: '2026-09-05T20:00:00+03:00',
  venue: 'قاعة السيتي',
  city: 'سيئون',
  college: 'كلية الحاسبات · جامعة سيئون',
  /** TODO: استبدل برابط الموقع الدقيق من خرائط جوجل عند توفره */
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=%D9%82%D8%A7%D8%B9%D8%A9+%D8%A7%D9%84%D8%B3%D9%8A%D8%AA%D9%8A+%D8%B3%D9%8A%D8%A6%D9%88%D9%86',
} as const

export interface ProgramItem {
  time: string
  title: string
  note?: string
}

/** TODO: راجع برنامج الحفل وعدّل حسب الخطة النهائية */
export const PROGRAM: ProgramItem[] = [
  { time: '7:00 م', title: 'استقبال الضيوف', note: 'التقاط الصور التذكارية عند مدخل القاعة' },
  { time: '8:00 م', title: 'افتتاح الحفل', note: 'قراءة من القرآن الكريم والنشيد الوطني' },
  { time: '8:20 م', title: 'كلمات الحفل', note: 'كلمة الجامعة والكلية ورؤساء الدفع' },
  { time: '9:00 م', title: 'عرض فيلم التخرج', note: 'رحلة أربع سنوات في دقائق' },
  { time: '9:20 م', title: 'تسليم الشهادات', note: 'صعود الخريجين على المسرح' },
  { time: '10:10 م', title: 'تكريم الرعاة والجهات الداعمة' },
  { time: '10:30 م', title: 'فقرة فنية أوبريت الخريجين' },
  { time: '11:00 م', title: 'الصورة الجماعية وختام الحفل' },
]
