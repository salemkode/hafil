import { useEffect, useState } from 'react'
import { Gate } from './components/Gate'
import { ScrollProgress } from './components/ScrollProgress'
import { FloatingHeader } from './components/FloatingHeader'
import { Hero } from './components/Hero'
import { Cohorts } from './components/Cohorts'
import { Students } from './components/Students'
import { YearInterlude } from './components/YearInterlude'
import { Sponsors } from './components/Sponsors'
import { GuestWall } from './components/GuestWall'
import { Finale } from './components/Finale'

export default function App() {
  return <MainSite />
}

function MainSite() {
  const [entered, setEntered] = useState(false)

  // فئة تجربة JS: تفعيل حركات الكشف (وتبقى المحتويات ظاهرة بدون JS)
  useEffect(() => {
    document.documentElement.classList.add('experience-js')
    return () => document.documentElement.classList.remove('experience-js')
  }, [])

  // مراقب الكشف عند التمرير — يعمل بعد فتح البوابة
  useEffect(() => {
    if (!entered) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8%' },
    )
    document.querySelectorAll('[data-reveal]').forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [entered])

  return (
    <div className="site-shell">
      <noscript>
        <style>{'.entry-gate{display:none!important}'}</style>
      </noscript>

      {!entered && <Gate onOpen={() => setEntered(true)} />}

      <ScrollProgress />
      <FloatingHeader />

      <main>
        <Hero />
        <Cohorts />
        <Students />
        <YearInterlude />
        <Sponsors />
        <GuestWall />
      </main>
      <Finale />
    </div>
  )
}
