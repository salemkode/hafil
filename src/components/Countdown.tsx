import { AnimatePresence, motion } from 'framer-motion'
import { useCountdown } from '../hooks/useCountdown'
import { EVENT } from '../data/event'

function Digit({ value }: { value: string }) {
  return (
    <span className="relative inline-block w-[0.6em] text-center tabular-nums">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          className="block"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Unit({ value, label }: { value: number; label: string }) {
  const s = String(value).padStart(2, '0')
  return (
    <div className="countdown-unit">
      <div className="countdown-value">
        <Digit value={s[0]} />
        <Digit value={s[1]} />
      </div>
      <div className="countdown-label">{label}</div>
    </div>
  )
}

/** عد تنازلي حادّ الهندام داخل بطاقة الموعد */
export function Countdown() {
  const { days, hours, minutes, seconds, done } = useCountdown(EVENT.targetDate)

  if (done) {
    return (
      <div className="event-live" role="status">
        <span>● مباشر الآن</span>
        <strong>الحفل قائم الآن! 🎉</strong>
      </div>
    )
  }

  return (
    <div className="countdown" dir="ltr">
      <Unit value={days} label="يوم" />
      <Unit value={hours} label="ساعة" />
      <Unit value={minutes} label="دقيقة" />
      <Unit value={seconds} label="ثانية" />
    </div>
  )
}
