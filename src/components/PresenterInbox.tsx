import { useEffect, useState, type FormEvent } from 'react'
import { supabase, type WallMessage } from '../lib/supabase'

const ACCESS_KEY = 'hafil-presenter-access'

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ar', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

export function PresenterInbox() {
  const [code, setCode] = useState('')
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(ACCESS_KEY) === '1')
  const [messages, setMessages] = useState<WallMessage[]>([])
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!unlocked || !supabase) return
    const client = supabase
    const load = async () => {
      setLoading(true)
      const { data } = await client.from('messages').select('*').order('created_at', { ascending: false })
      setMessages(data ?? [])
      setLoading(false)
    }
    void load()
    const channel = client
      .channel('presenter-messages')
      .on<WallMessage>('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((current) => (current.some((item) => item.id === payload.new.id) ? current : [payload.new, ...current]))
      })
      .subscribe()
    return () => void client.removeChannel(channel)
  }, [unlocked])

  function unlock(event: FormEvent) {
    event.preventDefault()
    const expected = import.meta.env.VITE_PRESENTER_CODE || 'hafil-presenter'
    if (code === expected) {
      sessionStorage.setItem(ACCESS_KEY, '1')
      setUnlocked(true)
      setError('')
    } else setError('الرمز غير صحيح')
  }

  if (!unlocked) {
    return <main dir="rtl" className="min-h-screen bg-[#07111f] px-5 py-16 text-white"><div className="mx-auto max-w-sm border border-white/10 bg-[#0a1727] p-6"><p className="mb-5 text-sm text-[#91a0b7]">لوحة المقدم</p><h1 className="mb-6 font-display text-3xl">الرسائل الواردة</h1><form onSubmit={unlock} className="space-y-3"><input autoFocus type="password" value={code} onChange={(event) => setCode(event.target.value)} placeholder="رمز الدخول" className="min-h-12 w-full border border-white/15 bg-[#07111f] px-4 text-white outline-none focus:border-[#32d5ff]" /><button className="min-h-12 w-full bg-[#32d5ff] px-4 font-bold text-[#07111f]">دخول</button>{error && <p className="text-sm text-[#f02a4a]">{error}</p>}</form></div></main>
  }

  const visible = messages.filter((item) => `${item.name} ${item.message}`.toLowerCase().includes(query.toLowerCase()))
  return <main dir="rtl" className="min-h-screen bg-[#07111f] px-5 py-10 text-white"><div className="mx-auto max-w-3xl"><div className="mb-8 flex items-end justify-between gap-4"><div><p className="mb-2 text-sm text-[#32d5ff]">لوحة المقدم · خاصة</p><h1 className="font-display text-4xl">الرسائل الواردة</h1></div><button onClick={() => { sessionStorage.removeItem(ACCESS_KEY); setUnlocked(false) }} className="text-sm text-[#91a0b7] underline">خروج</button></div><div className="mb-5 flex gap-3"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث بالاسم أو الرسالة" className="min-h-11 flex-1 border border-white/10 bg-[#0a1727] px-4 text-sm text-white outline-none focus:border-[#32d5ff]" /><button onClick={() => window.location.reload()} className="border border-white/10 px-4 text-sm text-[#91a0b7]">تحديث</button></div>{!supabase && <p className="border border-[#d8a929]/30 bg-[#d8a929]/10 p-4 text-sm text-[#d8a929]">Supabase غير مفعّل. أضف متغيرات البيئة أولًا.</p>}{loading && <p className="text-[#91a0b7]">جارٍ التحميل…</p>}<div className="space-y-3">{visible.map((item) => <article key={item.id} className="border border-white/10 bg-[#0a1727] p-5"><div className="mb-3 flex items-center justify-between gap-3"><strong>{item.name}</strong><time className="text-xs text-[#91a0b7]">{formatDate(item.created_at)}</time></div><p className="leading-8 text-[#c8d2df]">{item.message}</p></article>)}{!loading && visible.length === 0 && <p className="py-16 text-center text-[#91a0b7]">لا توجد رسائل مطابقة.</p>}</div></div></main>
}
