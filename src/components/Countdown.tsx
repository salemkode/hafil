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
    <div className="min-w-[64px] border border-[#cad5e2] bg-white px-3 py-2 text-center">
      <div className="font-mono text-2xl font-bold text-[#152a52] sm:text-[1.7rem]">
        <Digit value={s[0]} />
        <Digit value={s[1]} />
      </div>
      <div className="mt-0.5 text-[0.62rem] font-bold text-[#7b8799]">{label}</div>
    </div>
  )
}

/** عد تنازلي حادّ الهندام داخل بطاقة الموعد */
export function Countdown() {
  const { days, hours, minutes, seconds, done } = useCountdown(EVENT.targetDate)

  if (done) {
    return (
      <p className="mt-4 border border-[#cad5e2] bg-white px-4 py-3 font-display text-xl font-bold text-[#a90f27]">
        الحفل قائم الآن! 🎉
      </p>
    )
  }

  return (
    <div className="mt-5 flex items-stretch gap-2" dir="ltr">
      <Unit value={days} label="يوم" />
      <Unit value={hours} label="ساعة" />
      <Unit value={minutes} label="دقيقة" />
      <Unit value={seconds} label="ثانية" />
    </div>
  )
}
