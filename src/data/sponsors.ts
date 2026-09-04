export type Tier = 'diamond' | 'gold' | 'silver' | 'bronze' | 'participant'

export interface Sponsor {
  name: string
  latin?: string
  activity?: string
  logo?: string
  href?: string
  verified?: boolean
}

export const TIER_LABELS: Record<Tier, string> = {
  diamond: 'الراعي الماسي',
  gold: 'الراعي الذهبي',
  silver: 'الرعاة الفضيون',
  bronze: 'الرعاة البرونزيون',
  participant: 'الرعاة المشاركون',
}

export const TIER_SUBTITLES: Record<Tier, string> = {
  diamond: 'شريك الحفل الرئيسي',
  gold: 'ثلاثة شركاء داعمين',
  silver: 'شريكان داعمان',
  bronze: 'ثلاثة شركاء',
  participant: 'تسعة عشر شريكًا',
}

export const TIER_ORDER: Tier[] = ['diamond', 'gold', 'silver', 'bronze', 'participant']

export const SPONSORS: Record<Tier, Sponsor[]> = {
  diamond: [
    { name: 'ماكس — سيئون للتسوق', latin: 'MAX', activity: 'تسوّق وتجزئة', logo: '/assets/sponsors/diamond/max-shopping.jpg' },
  ],
  gold: [
    { name: 'بسكويت أبو ولد', latin: 'Abu Walad', logo: '/assets/sponsors/gold/abu-walad.png' },
    { name: 'إزار', latin: 'iZAR', logo: '/assets/sponsors/silver/izhr.jpg' },
    {
      name: 'موشا',
      latin: 'Mosha',
      logo: '/assets/sponsors/gold/mosha.png',
    },
  ],
  silver: [
    { name: 'الديرة للعبايات', logo: '/assets/sponsors/bronze/aldeerah.jpg' },
    {
      name: 'معمار دار الغناء للاستشارات الهندسية والمقاولات',
      logo: '/assets/sponsors/silver/memar-dar-albenaa.jpg',
    },
  ],
  bronze: [
    {
      name: 'منتجع جنات',
      latin: 'Janaat Resort',
      logo: '/assets/sponsors/bronze/janaat-resort.jpg',
    },
    { name: 'حلويات بازمول', latin: 'Bazmol Sweet', logo: '/assets/sponsors/bronze/bazmol-sweet.jpg' },
    { name: 'نصف', logo: '/assets/sponsors/bronze/ansaf.jpg' },
  ],
  participant: [
    { name: 'طريق الجبل للتجارة العامة', latin: 'KSS', logo: '/assets/sponsors/participant/kss.png' },
    { name: 'عشق كافيه', logo: '/assets/sponsors/participant/aech-cafe.png' },
    {
      name: 'مجموعة بن طالب للتجارة — بن طالب للمفروشات',
      logo: '/assets/sponsors/participant/bin-talib-trading.jpg',
    },
    { name: 'ستار بيتزا', latin: 'Star Pizza', logo: '/assets/sponsors/participant/star-pizza.jpg' },
    { name: 'جورداس كوكيز', latin: 'JORDAS Cookies', logo: '/assets/sponsors/participant/jordas.jpg' },
    { name: 'إشهار', logo: '/assets/sponsors/participant/ishhar.jpg' },
    { name: 'مؤسسة جواس للتجارة والتسويق الإلكتروني', latin: 'JAWAS', logo: '/assets/sponsors/participant/jawas.jpg' },
    { name: 'رواء شاليه', latin: 'Rawa Chalet', logo: '/assets/sponsors/participant/rawa-chalet.jpg' },
    { name: 'غصن كافيه', latin: 'GUSAN CAFE', logo: '/assets/sponsors/participant/ghosn-cafe.png' },
    { name: 'كينج', latin: 'KING', logo: '/assets/sponsors/participant/king.jpg' },
    { name: 'غروب', logo: '/assets/sponsors/participant/gharb.png' },
    { name: 'مزاج', latin: 'MAZAJ', logo: '/assets/sponsors/participant/mazaj.png' },
    { name: 'الثريا', latin: 'Al-Thuraya', logo: '/assets/sponsors/participant/al-thuraya.png' },
    { name: 'مركز اليرموك للتسوق', latin: 'Al Yarmouk Shopping Center', logo: '/assets/sponsors/participant/acyarmour.jpg' },
    { name: 'آرش كافيه', latin: 'ARCH CAFÉ', logo: '/assets/sponsors/participant/arch-cafe.jpg' },
    { name: 'نسيم ستور', latin: 'Naseem Store', logo: '/assets/sponsors/participant/naseem-store.jpg' },
    {
      name: 'استديو حضرموت للتصوير الرقمي',
      latin: 'Hadramout Studio',
      logo: '/assets/sponsors/participant/hadramout-studio.png',
    },
    { name: 'مؤسسة صبايا', logo: '/assets/sponsors/participant/sabaya.png' },
    { name: 'كارزما', latin: 'Charisma', logo: '/assets/sponsors/participant/charisma.jpg' },
  ],
}
