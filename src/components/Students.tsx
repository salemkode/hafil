import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { BATCHES, STUDENTS, batchById, type BatchId } from '../data/students'

type Filter = 'all' | BatchId

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'الجميع' },
  { id: 'cyberx', label: 'Cyber-X' },
  { id: 'brainware', label: 'BrainWare' },
]

const arabicCollator = new Intl.Collator('ar', { sensitivity: 'base', numeric: true })

function sortStudents(students: typeof STUDENTS) {
  return [...students].sort((a, b) => arabicCollator.compare(a.name, b.name))
}

function normalizeSearchText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
    .replace(/[\s-]/g, '')
    .toLowerCase()
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

function StudentCard({ name, batch, index }: { name: string; batch: BatchId; index: number }) {
  const b = batchById(batch)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.28, delay: Math.min(index * 0.02, 0.4) }}
      className="group flex items-center gap-3 border border-[color:var(--line)] bg-[#0a1727] p-3.5 transition-colors hover:bg-[#0d1d33]"
      style={{ borderTop: `2px solid ${b.accent}66` }}
    >
      <span
        className="font-mono flex h-11 w-11 shrink-0 items-center justify-center border text-xs font-bold"
        style={{ borderColor: `${b.accent}55`, color: b.accent, background: `${b.accent}14` }}
        aria-hidden
      >
        {initialsOf(name)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-white sm:text-[0.95rem]" dir="ltr" style={{ textAlign: 'right' }}>
          {name}
        </p>
        <p className="text-[0.66rem] font-bold" style={{ color: b.accent }}>
          {b.name} · {b.department}
        </p>
      </div>
    </motion.div>
  )
}

export function Students() {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = normalizeSearchText(query.trim())
    return sortStudents(STUDENTS.filter((s) => {
      if (filter !== 'all' && s.batch !== filter) return false
      if (!q) return true
      return normalizeSearchText(s.name).includes(q)
    }))
  }, [filter, query])

  return (
    <section className="students-section" id="students">
      <div className="section-heading" data-reveal>
        <p className="section-index">02 · الخريجون</p>
        <h2>
          {STUDENTS.length} اسمًا، <span>وحكاية واحدة</span>
        </h2>
        <p className="section-intro">
          دليل خريجي دفعتي {BATCHES.map((b) => b.name).join(' و ')} — ابحث باسمك أو صدقائك.
        </p>
      </div>

      <div data-reveal className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex border border-[color:var(--line)] bg-[#0a1727] p-1" role="tablist" aria-label="فلترة الدفعات">
          {FILTERS.map((f) => {
            const active = filter === f.id
            const accent = f.id === 'cyberx' ? '#f02a4a' : f.id === 'brainware' ? '#32d5ff' : '#d8a929'
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`relative min-h-[40px] px-4 text-xs font-bold transition-colors ${
                  active ? 'text-[#05101d]' : 'text-[#91a0b7] hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="students-filter-pill"
                    className="absolute inset-0"
                    style={{ backgroundColor: accent }}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative" dir={f.id === 'all' ? undefined : 'ltr'}>
                  {f.label}
                </span>
              </button>
            )
          })}
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن خريج…"
            className="min-h-[46px] w-full border border-[color:var(--line)] bg-[#0a1727] px-4 text-sm text-white placeholder:text-[#5b6a80] focus:border-[#32d5ff]/50 focus:outline-none"
            aria-label="البحث عن خريج"
          />
        </div>
      </div>

      <p className="mb-4 font-mono text-[0.66rem] tracking-widest text-[#5b6a80]" aria-live="polite">
        {filtered.length === STUDENTS.length ? `SHOWING ALL ${STUDENTS.length}` : `SHOWING ${filtered.length}/${STUDENTS.length}`}
      </p>

      {filter === 'all' ? (
        <div className="space-y-8">
          {BATCHES.map((batch) => {
            const sectionStudents = filtered.filter((student) => student.batch === batch.id)
            if (sectionStudents.length === 0) return null
            return (
              <div key={batch.id}>
                <div className="mb-3 flex items-center gap-3">
                  <h3 className="text-sm font-bold text-white">{batch.department}</h3>
                  <span className="font-mono text-[0.65rem] tracking-widest text-[#5b6a80]">{sectionStudents.length}</span>
                </div>
                <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {sectionStudents.map((s, i) => (
                      <StudentCard key={s.name} name={s.name} batch={s.batch} index={i} />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((s, i) => (
              <StudentCard key={s.name} name={s.name} batch={s.batch} index={i} />
            ))}
          </AnimatePresence>
        </div>
      )}

      {filtered.length === 0 && (
        <p className="mt-4 border border-[color:var(--line)] bg-[#0a1727] p-8 text-center text-sm text-[#91a0b7]">
          لا توجد نتائج مطابقة لبحثك.
        </p>
      )}
    </section>
  )
}
