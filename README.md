# BrainWare × Cyber-X — موقع حفل التخرج 2026

موقع حفل تخرج دفعتي **BrainWare** (علوم الحاسوب) و **Cyber-X** (أمن المعلومات) — كلية الحاسبات، جامعة سيئون.

**الهوية البصرية:** ثيم مزدوج (سايان لأبرين وير × أحمر لسايبر إكس، والذهبي للقاسم المشترك) بخط **ثمانية Thmanyah** (Serif Display للعناوين + Sans للنصوص)، هندسة حادة clip-path، وبوابة دخول سينمائية.

## التشغيل

```bash
npm install
npm run dev      # التطوير
npm run build    # بناء الإنتاج
npm run preview  # معاينة الإنتاج
```

## البنية

```
src/
├── data/
│   ├── event.ts      # التاريخ (سبتمبر 2026)، القاعة (قاعة السيتي · سيئون)، البرنامج
│   ├── students.ts   # 53 خريجًا (Cyber-X 34 + BrainWare 19)
│   └── sponsors.ts   # الرعاة: ماسي/ذهبي/فضي/برونزي/مشاركون (22 شريكًا)
├── components/       # Gate, Hero, Cohorts, Students, EventCard, Timeline, Sponsors, GuestWall, Finale
└── index.css         # نظام التصميم: خط ثمانية + كل الأنماط المنقولة
public/
├── fonts/            # Thmanyah woff2 (مستضاف محليًا)
└── assets/           # شعارات الدفع الشفافة + شعارات الرعاة + لوحة الرعاة
```

## الميزات

- **بوابة دخول** بانقسام سايان/أحمر + إشارات ضوئية + احتفال confetti
- **شريط تقدم القراءة** بتدرج ثلاثي الألوان
- **دليل الخريجين**: بحث + فلترة دفعة
- **عد تنازلي** بأرقام متحركة داخل بطاقة الموعد
- **جدار تهنئات** (Supabase سحابي / وضع تجريبي محلي)
- **قسم رعاة فاتح** بشعارات حقيقية وروابط موثقة + لوحة الرعاة الأصلية
- احترام `prefers-reduced-motion` ومحتويات ظاهرة بدون JavaScript

## ربط جدار التهنئات (Supabase)

1. أنشئ مشروعًا مجانيًا على [supabase.com](https://supabase.com)
2. نفّذ `supabase/schema.sql` في SQL Editor لإنشاء جدول `messages` وتفعيل Realtime
3. انسخ `.env.example` إلى `.env` واملأ `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY`

## النشر (Vercel)

```bash
npm i -g vercel
vercel --prod
```

## ⚠️ TODO قبل الحفل

- [ ] تأكيد وقت بداية الحفل (`event.ts → targetDate` — حاليًا 8 مساءً)
- [ ] رابط خرائط جوجل الدقيق لقاعة السيتي في سيئون
- [ ] مراجعة برنامج الحفل النهائي
- [ ] تفعيل Supabase + النشر + QR للموقع
