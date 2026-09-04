import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, type FormEvent } from 'react'
import { isCloudWall, supabase, type PresenterMessage, type WallMessage } from '../lib/supabase'
import { burstSmall } from '../lib/confetti'

const LOCAL_KEY = 'bwcx-wall-messages'
const PRESENTER_LOCAL_KEY = 'bwcx-presenter-messages'
const MAX_LEN = 280

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

const rtf = new Intl.RelativeTimeFormat('ar', { numeric: 'auto' })

function timeAgo(iso: string): string {
  const diffMs = new Date(iso).getTime() - Date.now()
  const minutes = Math.round(diffMs / 60_000)
  if (Math.abs(minutes) < 60) return rtf.format(minutes, 'minute')
  const hours = Math.round(minutes / 60)
  if (Math.abs(hours) < 24) return rtf.format(hours, 'hour')
  return rtf.format(Math.round(hours / 24), 'day')
}

function readLocal(): WallMessage[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '[]') as WallMessage[]
  } catch {
    return []
  }
}

function writeLocal(list: WallMessage[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(list.slice(0, 80)))
}

function addMessage(list: WallMessage[], incoming: WallMessage) {
  if (list.some(({ id }) => id === incoming.id)) return list
  return [incoming, ...list].slice(0, 60)
}

async function loadMessages(): Promise<WallMessage[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(60)
    if (!error && data) return data
    return []
  }
  return readLocal()
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

function MessageCard({ msg }: { msg: WallMessage }) {
  const color = BATCH_COLORS[msg.batch] ?? BATCH_COLORS.guest
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
      className="border border-[color:var(--line)] bg-[#0a1727] p-4"
      style={{ borderTop: `2px solid ${color}77` }}
    >
      <div className="flex items-center gap-3">
        <span
          className="font-mono flex h-10 w-10 shrink-0 items-center justify-center border text-xs font-bold"
          style={{ borderColor: `${color}55`, color, background: `${color}14` }}
          aria-hidden
        >
          {initialsOf(msg.name)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-white">{msg.name}</p>
          <p className="text-[0.64rem] font-bold" style={{ color }}>
            {BATCH_LABELS[msg.batch] ?? BATCH_LABELS.guest}
          </p>
        </div>
        <time className="shrink-0 font-mono text-[0.6rem] text-[#5b6a80]">{timeAgo(msg.created_at)}</time>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[#b6c1d0]">{msg.message}</p>
    </motion.li>
  )
}

export function GuestWall() {
  const [messages, setMessages] = useState<WallMessage[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [recipient, setRecipient] = useState<'wall' | 'presenter'>('wall')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    void loadMessages().then(setMessages)
    if (!supabase) return
    const client = supabase

    const channel = client
      .channel('messages-wall')
      .on<WallMessage>(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => setMessages((current) => addMessage(current, payload.new)),
      )
      .subscribe()

    const refresh = window.setInterval(() => {
      void loadMessages().then(setMessages)
    }, 5 * 60_000)

    return () => {
      window.clearInterval(refresh)
      void client.removeChannel(channel)
    }
  }, [])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const cleanName = name.trim().slice(0, 60)
    const cleanMsg = message.trim().slice(0, MAX_LEN)
    if (!cleanName || !cleanMsg || sending) return

    setSending(true)
    try {
      if (recipient === 'presenter') {
        if (supabase) {
          const { error } = await supabase
            .from('presenter_messages')
            .insert({ name: cleanName, message: cleanMsg })
          if (error) return
        } else {
          let local: PresenterMessage[] = []
          try {
            local = JSON.parse(localStorage.getItem(PRESENTER_LOCAL_KEY) ?? '[]') as PresenterMessage[]
          } catch {
            local = []
          }
          local.unshift({ id: -Date.now(), name: cleanName, message: cleanMsg, created_at: new Date().toISOString() })
          localStorage.setItem(PRESENTER_LOCAL_KEY, JSON.stringify(local.slice(0, 80)))
        }
      } else if (supabase) {
        const { data, error } = await supabase
          .from('messages')
          .insert({ name: cleanName, batch: 'guest', message: cleanMsg })
          .select()
          .single()
        if (!error && data) setMessages((current) => addMessage(current, data))
      } else {
        const optimistic: WallMessage = {
          id: -Date.now(),
          name: cleanName,
          batch: 'guest',
          message: cleanMsg,
          created_at: new Date().toISOString(),
        }
        const next = [optimistic, ...readLocal()]
        writeLocal(next)
        setMessages(next)
      }
      setMessage('')
      setSent(true)
      setTimeout(() => setSent(false), 2500)
      const rect = (e.target as HTMLElement).getBoundingClientRect()
      burstSmall(rect.left / window.innerWidth + rect.width / (2 * window.innerWidth), Math.max(0.2, rect.top / window.innerHeight))
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="wall-section" id="wall">
      <div className="section-heading" data-reveal>
        <p className="section-index">06 · التهنئات</p>
        <h2>
          اكتب لهم <span>كلمة من القلب</span>
        </h2>
        <p className="section-intro">شارك تهنئتك مع الخريجين — تظهر مباشرة هنا وفي حفلهم.</p>
      </div>

      <div data-reveal className="border border-[color:var(--line)] bg-[#0a1727] p-5 sm:p-7">
        {!isCloudWall && (
          <p className="mb-4 border border-[#d8a929]/30 bg-[#d8a929]/10 px-4 py-2.5 text-center text-xs text-[#d8a929]">
            وضع تجريبي: الرسائل تُحفظ محليًا على جهازك — سيتم الربط السحابي قريبًا
          </p>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
              <label htmlFor="wall-name" className="mb-1.5 block text-xs font-bold text-[#91a0b7]">
                الاسم
              </label>
              <input
                id="wall-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={60}
                placeholder="اسمك الكريم"
                className="min-h-[46px] w-full border border-[color:var(--line)] bg-[#07111f] px-4 text-sm text-white placeholder:text-[#5b6a80] focus:border-[#32d5ff]/50 focus:outline-none"
              />
          </div>
          <div>
            <span className="mb-1.5 block text-xs font-bold text-[#91a0b7]">إلى</span>
            <div className="grid grid-cols-2 gap-2" role="group" aria-label="مستلم الرسالة">
              <button
                type="button"
                onClick={() => setRecipient('wall')}
                aria-pressed={recipient === 'wall'}
                className={`min-h-[46px] border px-4 text-sm font-bold transition-colors ${
                  recipient === 'wall'
                    ? 'border-[#32d5ff] bg-[#32d5ff]/15 text-[#32d5ff]'
                    : 'border-[color:var(--line)] bg-[#07111f] text-[#91a0b7]'
                }`}
              >
                الجدار العام
              </button>
              <button
                type="button"
                onClick={() => setRecipient('presenter')}
                aria-pressed={recipient === 'presenter'}
                className={`min-h-[46px] border px-4 text-sm font-bold transition-colors ${
                  recipient === 'presenter'
                    ? 'border-[#d8a929] bg-[#d8a929]/15 text-[#d8a929]'
                    : 'border-[color:var(--line)] bg-[#07111f] text-[#91a0b7]'
                }`}
              >
                رسالة خاصة للمقدم
              </button>
            </div>
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="wall-msg" className="block text-xs font-bold text-[#91a0b7]">
                {recipient === 'presenter' ? 'رسالتك إلى المقدم' : 'التهنئة'}
              </label>
              <span className="font-mono text-[0.6rem] text-[#5b6a80]">
                {message.length}/{MAX_LEN}
              </span>
            </div>
            <textarea
              id="wall-msg"
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, MAX_LEN))}
              required
              rows={3}
              placeholder={recipient === 'presenter' ? 'اكتب رسالتك الخاصة للمقدم…' : 'اكتب تهنئتك للخريجين…'}
              className="w-full resize-none border border-[color:var(--line)] bg-[#07111f] px-4 py-3 text-sm leading-relaxed text-white placeholder:text-[#5b6a80] focus:border-[#32d5ff]/50 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="primary-action w-full justify-center sm:w-auto"
            style={{ touchAction: 'manipulation' }}
          >
            <span>
              {sending
                ? 'جارٍ الإرسال…'
                : sent
                  ? recipient === 'presenter'
                    ? 'وصلت رسالتك للمقدم ✓'
                    : 'تم النشر ✓'
                  : recipient === 'presenter'
                    ? 'إرسال للمقدم'
                    : 'انشر التهنئة'}
            </span>
          </button>
        </form>
      </div>

      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <MessageCard key={m.id} msg={m} />
          ))}
        </AnimatePresence>
      </ul>

      {messages.length === 0 && (
        <p className="mt-2 border border-[color:var(--line)] bg-[#0a1727] p-10 text-center text-sm text-[#91a0b7]">
          كن أول من يهنئ الخريجين.
        </p>
      )}
    </section>
  )
}
