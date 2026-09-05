import { useEffect, useState } from 'react'
import { supabase, type WallMessage } from '../lib/supabase'

const BATCH_LABELS: Record<WallMessage['batch'], string> = {
  guest: 'ضيف',
  cyberx: 'Cyber-X',
  brainware: 'BrainWare',
}

const BATCH_COLORS: Record<WallMessage['batch'], string> = {
  guest: '#d8a929',
  cyberx: '#f02a4a',
  brainware: '#32d5ff',
}

const formatter = new Intl.DateTimeFormat('ar', { dateStyle: 'medium' })

function MessageCard({ message }: { message: WallMessage }) {
  const color = BATCH_COLORS[message.batch]

  return (
    <li className="border border-[color:var(--line)] bg-[#0a1727] p-4" style={{ borderTop: `2px solid ${color}77` }}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-white">{message.name}</p>
          <p className="text-[0.64rem] font-bold" style={{ color }}>{BATCH_LABELS[message.batch]}</p>
        </div>
        <time className="shrink-0 text-[0.7rem] text-[#5b6a80]">{formatter.format(new Date(message.created_at))}</time>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[#b6c1d0]">{message.message}</p>
    </li>
  )
}

export function GuestWall() {
  const [messages, setMessages] = useState<WallMessage[]>([])

  useEffect(() => {
    if (!supabase) return

    void supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(60)
      .then(({ data }) => {
        if (data) setMessages(data)
      })
  }, [])

  return (
    <section className="wall-section" id="wall">
      <div className="section-heading" data-reveal>
        <p className="section-index">04 · التهنئات</p>
        <h2>
          كلماتٌ <span>تبقى في الذاكرة</span>
        </h2>
        <p className="section-intro">هذه التهاني كُتبت للخريجين احتفالًا بيومهم الكبير.</p>
      </div>

      <p data-reveal className="border border-[#d8a929]/30 bg-[#d8a929]/10 px-5 py-4 text-center text-sm leading-7 text-[#ead38b]">
        انتهت فترة استقبال التهاني بانتهاء الحفل، شكرًا لكل من شاركنا كلماته الجميلة.
      </p>

      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {messages.map((message) => <MessageCard key={message.id} message={message} />)}
      </ul>

      {!supabase && (
        <p className="mt-5 border border-[color:var(--line)] bg-[#0a1727] p-8 text-center text-sm text-[#91a0b7]">
          التهاني محفوظة في أرشيف الحفل.
        </p>
      )}
    </section>
  )
}
