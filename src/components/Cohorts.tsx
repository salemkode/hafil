import { BATCHES, STUDENTS } from '../data/students'

/** الهويتان: لوحتان (سايان لأبرين وير / أحمر لسايبر إكس) يلتقيان عند نقطة واحدة */
export function Cohorts() {
  return (
    <section className="cohorts-section" id="cohorts">
      <div className="section-heading" data-reveal>
        <p className="section-index">01 · الهويتان</p>
        <h2>
          مساران، <span>وأثرٌ واحد</span>
        </h2>
      </div>

      <div className="cohort-stage">
        {BATCHES.map((cohort, index) => (
          <article className={`cohort-panel ${cohort.id === 'cyberx' ? 'cyberx' : 'brainware'}`} key={cohort.name} data-reveal>
            <div className="panel-code" aria-hidden>
              0{index + 1} / 02
            </div>
            <div className="logo-frame">
              <img src={cohort.logo} alt={`شعار دفعة ${cohort.name}`} />
            </div>
            <div className="cohort-copy">
              <p>دفعة</p>
              <h3>{cohort.name}</h3>
              <span>{cohort.tagline}</span>
              <span className="!mt-2 text-[0.78rem] !text-muted/80">
                {cohort.department} · {STUDENTS.filter((s) => s.batch === cohort.id).length} خريجًا
              </span>
              <a
                href="#students"
                className="mt-4 inline-block w-fit border px-4 py-2 text-[0.72rem] font-bold transition-colors"
                style={{ borderColor: `${cohort.accent}55`, color: cohort.accent }}
              >
                الخريجون ←
              </a>
            </div>
            <div className="panel-track" aria-hidden>
              <i />
            </div>
          </article>
        ))}

        <div className="meeting-point is-visible">
          <span aria-hidden>×</span>
          <p>هنا يلتقي المساران</p>
        </div>
      </div>
    </section>
  )
}
