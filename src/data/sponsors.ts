export type Tier = 'diamond' | 'gold' | 'silver' | 'bronze' | 'participant'

export interface Sponsor {
  name: string
  latin?: string
  activity?: string
  logo: string
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
  gold: 'شريك تقني',
  silver: 'شريكان داعمان',
  bronze: 'أربعة شركاء',
  participant: 'أربعة عشر شريكًا',
}

export const TIER_ORDER: Tier[] = ['diamond', 'gold', 'silver', 'bronze', 'participant']

export const SPONSORS: Record<Tier, Sponsor[]> = {
  diamond: [
    { name: 'ماكس سيئون للتسوق', latin: 'MAX', activity: 'تسوّق وتجزئة', logo: '/assets/sponsors/diamond/max-shopping.png' },
  ],
  gold: [
    {
      name: 'ميثاق سوفت',
      latin: 'Meethaq Soft',
      activity: 'حلول تقنية وأنظمة مالية وفنية',
      logo: '/assets/sponsors/gold/meethaq.png',
      href: 'https://www.facebook.com/MeethaqSoft/',
      verified: true,
    },
  ],
  silver: [
    { name: 'إزهر', latin: 'IZHR', logo: '/assets/sponsors/silver/izhr.png' },
    {
      name: 'معمار دار العناء',
      activity: 'استشارات وتصميم معماري',
      logo: '/assets/sponsors/silver/memar-dar-albenaa.png',
      href: 'https://www.instagram.com/p/DbzkTpqCrS6/',
      verified: true,
    },
  ],
  bronze: [
    {
      name: 'شاليه جنات',
      latin: 'Janaat Resort',
      activity: 'منتزه وشاليه عائلي',
      logo: '/assets/sponsors/bronze/jamaat-resort.png',
      href: 'https://www.instagram.com/janaat_resort1/',
      verified: true,
    },
    { name: 'حلويات بازمول', latin: 'Bazmol Sweet', activity: 'حلويات', logo: '/assets/sponsors/bronze/bazmol-sweet.png' },
    { name: 'الديرة', activity: 'علامة محلية', logo: '/assets/sponsors/bronze/aldeerah.png' },
    { name: 'أنصف', activity: 'مبادرة محلية', logo: '/assets/sponsors/bronze/ansaf.png' },
  ],
  participant: [
    { name: 'كشخة', activity: 'علامة محلية', logo: '/assets/sponsors/participant/kashkhah.png' },
    {
      name: 'بن طالب للتجارة',
      latin: 'Bin Talib Trading',
      activity: 'مفروشات وتجارة',
      logo: '/assets/sponsors/participant/bin-talib-trading.png',
      href: 'https://www.instagram.com/reel/DT7Omw4DEox/',
      verified: true,
    },
    { name: 'ستار سنتر', latin: 'Star Center', logo: '/assets/sponsors/participant/star-center.png' },
    { name: 'إشهار', activity: 'دعاية وإعلان', logo: '/assets/sponsors/participant/ishhar.png' },
    { name: 'جواس', latin: 'JAWAS', logo: '/assets/sponsors/participant/jawas.png' },
    { name: 'نسيم ستور', latin: 'Naseem Store', activity: 'متجر', logo: '/assets/sponsors/participant/naseem-store.png' },
    { name: 'كينج', latin: 'KING', logo: '/assets/sponsors/participant/king.png' },
    { name: 'غرب', activity: 'علامة محلية', logo: '/assets/sponsors/participant/gharb.png' },
    { name: 'رداء', activity: 'علامة محلية', logo: '/assets/sponsors/participant/ridaa.png' },
    { name: 'أسيار مور', latin: 'acyarmour', activity: 'تسوّق إلكتروني', logo: '/assets/sponsors/participant/acyarmour.png' },
    { name: 'إيتش كافيه', latin: 'AECH CAFÉ', activity: 'مقهى', logo: '/assets/sponsors/participant/aech-cafe.png' },
    { name: 'هارِم', latin: 'Harim', logo: '/assets/sponsors/participant/harim.png' },
    { name: 'جورداس', latin: 'JORDAS', logo: '/assets/sponsors/participant/jordas.png' },
    {
      name: 'استديو حضرموت',
      latin: 'Hadramout Studio',
      activity: 'تصوير فوتوغرافي',
      logo: '/assets/sponsors/participant/hadramout-studio.png',
    },
  ],
}
