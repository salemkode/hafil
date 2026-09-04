import { useEffect, useState } from 'react'
import { burstCelebration } from '../lib/confetti'

/** بوابة الدخول: نصفان (سايان × أحمر) ينفتحان على التجربة */
export function Gate({ onOpen }: { onOpen: () => void }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const open = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.style.overflow = ''
      burstCelebration()
      onOpen()
      return
    }
    setLeaving(true)
    window.setTimeout(() => {
      document.body.style.overflow = ''
      burstCelebration()
      onOpen()
    }, 1200)
  }

  return (
    <section className={`entry-gate ${leaving ? 'is-leaving' : ''}`} aria-label="بوابة دخول التجربة">
      <div className="gate-grid" aria-hidden />
      <div className="gate-beam gate-beam-cyan" aria-hidden />
      <div className="gate-beam gate-beam-red" aria-hidden />

      <div className="gate-content">
        <p className="gate-eyebrow">كلية الحاسبات · جامعة سيئون</p>
        <div className="gate-logos" aria-label="شعارا الدفعتين">
          <div className="gate-logo-card brainware-card">
            <img src="/assets/cohorts/brainware-transparent.png" alt="شعار دفعة BrainWare" />
          </div>
          <span className="gate-x" aria-hidden>
            ×
          </span>
          <div className="gate-logo-card cyberx-card">
            <img src="/assets/cohorts/cyberx-transparent.png" alt="شعار دفعة Cyber-X" />
          </div>
        </div>
        <p className="gate-kicker">حفل تخرّج دفعتَي</p>
        <h1 className="gate-title">
          <span className="gate-title-left">BrainWare</span>
          <span className="gate-title-x">×</span>
          <span className="gate-title-right">Cyber-X</span>
        </h1>
        <p className="gate-line">دفعتان. لحظة واحدة.</p>
        <div className="gate-actions">
          <button className="primary-action" type="button" onClick={open}>
            <span>افتح التجربة</span>
            <b aria-hidden>
              ←
            </b>
          </button>
        </div>
      </div>
      <p className="gate-hint">مرّر بعد الدخول لاكتشاف الحكاية</p>
    </section>
  )
}
