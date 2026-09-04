import { PROGRAM } from '../data/event'

/** برنامج الرحلة — خط زمني حادّ بتفاصيل مونو */
export function Timeline() {
  return (
    <section className="program-section" id="program">
      <div className="section-heading" data-reveal>
        <p className="section-index">04 · برنامج الرحلة</p>
        <h2>
          صباحًا من الاستقبال <span>إلى التكريم</span>
        </h2>
      </div>

      <ol className="relative border-r border-[color:var(--line)] pr-8 sm:mx-auto sm:max-w-2xl">
        {PROGRAM.map((item, i) => (
          <li
            key={item.time + item.title}
            className="relative pb-8 last:pb-0"
            data-reveal
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <span
              className="absolute -right-[35px] top-1.5 grid h-3 w-3 place-items-center rounded-full border"
              style={{ borderColor: i % 2 ? '#f02a4a' : '#32d5ff', background: '#07111f' }}
              aria-hidden
            />
            <div className="border border-[color:var(--line)] bg-[#0a1727] p-4 transition-colors hover:bg-[#0d1d33]">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-bold text-white sm:text-base">{item.title}</h3>
                <span className="shrink-0 border border-[#cad5e2]/10 bg-[#152a52] px-2 py-1 font-mono text-[0.66rem] font-bold text-[#d8a929]">
                  {item.time}
                </span>
              </div>
              {item.note && <p className="mt-1.5 text-xs leading-relaxed text-[#91a0b7]">{item.note}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
