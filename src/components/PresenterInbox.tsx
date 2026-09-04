import { useEffect, useState, type FormEvent } from 'react'
import { supabase, type PresenterMessage, type WallMessage } from '../lib/supabase'

const ACCESS_KEY = 'hafil-presenter-access'
const LOCAL_KEY = 'bwcx-wall-messages'
const PRESENTER_LOCAL_KEY = 'bwcx-presenter-messages'

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ar', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

function readLocal<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '[]') as T[]
  } catch {
    return []
  }
}

function upsert<T extends { id: number }>(list: T[], incoming: T) {
  return list.some((item) => item.id === incoming.id) ? list : [incoming, ...list]
}

export function PresenterInbox() {
  const [code, setCode] = useState('')
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(ACCESS_KEY) === '1')
  const [tab, setTab] = useState<'inbox' | 'wall'>('inbox')
  const [inbox, setInbox] = useState<PresenterMessage[]>([])
  const [messages, setMessages] = useState<WallMessage[]>([])
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!unlocked) return
    if (!supabase) {
      setInbox(readLocal<PresenterMessage>(PRESENTER_LOCAL_KEY))
      const sync = (event: StorageEvent) => {
        if (event.key === LOCAL_KEY) setMessages(readLocal<WallMessage>(LOCAL_KEY))
        if (event.key === PRESENTER_LOCAL_KEY) setInbox(readLocal<PresenterMessage>(PRESENTER_LOCAL_KEY))
      }
      window.addEventListener('storage', sync)
      return () => window.removeEventListener('storage', sync)
    }
    const client = supabase
    const load = async () => {
      setLoading(true)
      const [inboxRes, wallRes] = await Promise.all([
        client.from('presenter_messages').select('*').order('created_at', { ascending: false }),
        client.from('messages').select('*').order('created_at', { ascending: false }),
      ])
      setInbox(inboxRes.data ?? [])
      setMessages(wallRes.data ?? [])
      setLoading(false)
    }
    void load()
    const channel = client
      .channel('presenter-feed')
      .on<PresenterMessage>('postgres_changes', { event: 'INSERT', schema: 'public', table: 'presenter_messages' }, (payload) => {
        setInbox((current) => upsert(current, payload.new))
      })
      .on<WallMessage>('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((current) => upsert(current, payload.new))
      })
      .subscribe()
    return () => void client.removeChannel(channel)
  }, [unlocked])

  function unlock(event: FormEvent) {
    event.preventDefault()
    const expected = import.meta.env.VITE_PRESENTER_CODE || '12345678'
    if (code === expected) {
      sessionStorage.setItem(ACCESS_KEY, '1')
      setUnlocked(true)
      setError('')
    } else setError('الرمز غير صحيح')
  }

  if (!unlocked) {
    return <main dir="rtl" className="min-h-screen bg-[#07111f] px-5 py-16 text-white"><div className="mx-auto max-w-sm border border-white/10 bg-[#0a1727] p-6"><p className="mb-5 text-sm text-[#91a0b7]">لوحة المقدم</p><h1 className="mb-6 font-display text-3xl">الرسائل الواردة</h1><form onSubmit={unlock} className="space-y-3"><input autoFocus type="password" inputMode="numeric" pattern="[0-9]{8}" maxLength={8} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 8))} placeholder="رمز الدخول (٨ أرقام)" className="min-h-12 w-full border border-white/15 bg-[#07111f] px-4 text-white outline-none focus:border-[#32d5ff]" /><button className="min-h-12 w-full bg-[#32d5ff] px-4 font-bold text-[#07111f]">دخول</button>{error && <p className="text-sm text-[#f02a4a]">{error}</p>}</form></div></main>
  }

  const active = tab === 'inbox'
    ? inbox.filter((item) => `${item.name} ${item.message}`.toLowerCase().includes(query.toLowerCase()))
    : messages.filter((item) => `${item.name} ${item.message}`.toLowerCase().includes(query.toLowerCase()))
  const totalCount = inbox.length + messages.length
  return <main dir="rtl" className="min-h-screen bg-[#07111f] px-5 py-10 text-white"><div className="mx-auto max-w-3xl"><div className="mb-8 flex items-end justify-between gap-4"><div><p className="mb-2 text-sm text-[#32d5ff]">لوحة المقدم · خاصة</p><h1 className="font-display text-4xl">الرسائل الواردة</h1></div><button onClick={() => { sessionStorage.removeItem(ACCESS_KEY); setUnlocked(false) }} className="text-sm text-[#91a0b7] underline">خروج</button></div><div className="mb-5 grid grid-cols-2 gap-2"><button onClick={() => setTab('inbox')} aria-pressed={tab === 'inbox'} className={`min-h-11 border px-4 text-sm font-bold ${tab === 'inbox' ? 'border-[#d8a929] bg-[#d8a929]/15 text-[#d8a929]' : 'border-white/10 bg-[#0a1727] text-[#91a0b7]'}`}>رسائل المقدم ({inbox.length})</button><button onClick={() => setTab('wall')} aria-pressed={tab === 'wall'} className={`min-h-11 border px-4 text-sm font-bold ${tab === 'wall' ? 'border-[#32d5ff] bg-[#32d5ff]/15 text-[#32d5ff]' : 'border-white/10 bg-[#0a1727] text-[#91a0b7]'}`}>جدار التهنئات ({messages.length})</button></div><div className="mb-5 flex gap-3"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث بالاسم أو الرسالة" className="min-h-11 flex-1 border border-white/10 bg-[#0a1727] px-4 text-sm text-white outline-none focus:border-[#32d5ff]" /><button onClick={() => window.location.reload()} className="border border-white/10 px-4 text-sm text-[#91a0b7]">تحديث ({totalCount})</button></div>{!supabase && <p className="border border-[#d8a929]/30 bg-[#d8a929]/10 p-4 text-sm text-[#d8a929]">Supabase غير مفعّل. أضف متغيرات البيئة أولًا.</p>}{loading && <p className="text-[#91a0b7]">جارٍ التحميل…</p>}<div className="space-y-3">{active.map((item) => <article key={item.id} className="border border-white/10 bg-[#0a1727] p-5" style={tab === 'inbox' ? { borderInlineStart: `2px solid #d8a92988` } : undefined}><div className="mb-3 flex items-center justify-between gap-3"><strong>{item.name}</strong><time className="text-xs text-[#91a0b7]">{formatDate(item.created_at)}</time></div><p className="leading-8 text-[#c8d2df]">{item.message}</p></article>)}{!loading && active.length === 0 && <p className="py-16 text-center text-[#91a0b7]">لا توجد رسائل مطابقة.</p>}</div></div></main>
}
