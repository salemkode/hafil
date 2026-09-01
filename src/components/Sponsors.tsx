import { SPONSORS, TIER_LABELS, TIER_ORDER, TIER_SUBTITLES, type Sponsor, type Tier } from '../data/sponsors'

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const content = (
    <>
      <div className="sponsor-logo">
        <img src={sponsor.logo} alt={`شعار ${sponsor.name}`} loading="lazy" />
      </div>
      <div className="sponsor-info">
        <h4>{sponsor.name}</h4>
        {sponsor.latin && <span>{sponsor.latin}</span>}
        {sponsor.activity && <p>{sponsor.activity}</p>}
        <small>{sponsor.verified ? 'هوية مرتبطة بصفحة موثقة بالبحث' : 'الاسم من لوحة الرعاة المعتمدة'}</small>
      </div>
      {sponsor.href && (
        <i className="external-mark" aria-hidden>
          ↗
        </i>
      )}
    </>
  )

  return sponsor.href ? (
    <a className="sponsor-card" href={sponsor.href} target="_blank" rel="noreferrer" data-reveal>
      {content}
    </a>
  ) : (
    <article className="sponsor-card" data-reveal>
      {content}
    </article>
  )
}

export function Sponsors() {
  const total = TIER_ORDER.reduce((sum, t) => sum + SPONSORS[t].length, 0)

  return (
    <section className="sponsors-section" id="sponsors">
      <div className="section-heading" data-reveal>
        <p className="section-index">05 · شركاء النجاح</p>
        <h2>
          كل أثر عظيم، <span>وراءه من آمن به</span>
        </h2>
        <p className="section-intro">
          شكرًا لكل جهة شاركت في صناعة هذه الليلة ودعمت رحلة الدفعتين — {total} شريكًا في {TIER_ORDER.length} فئات.
        </p>
      </div>

      <div className="sponsor-stats" data-reveal aria-label="فئات الرعاية">
        <div className="featured-tier">
          <strong>1</strong>
          <span>الراعي الماسي</span>
        </div>
        <div>
          <strong>1</strong>
          <span>الراعي الذهبي</span>
        </div>
        <div>
          <strong>2</strong>
          <span>الرعاة الفضيون</span>
        </div>
        <div>
          <strong>4</strong>
          <span>الرعاة البرونزيون</span>
        </div>
        <div>
          <strong>14</strong>
          <span>الرعاة المشاركون</span>
        </div>
      </div>

      <div className="sponsor-directory">
        {TIER_ORDER.map((tier: Tier) => (
          <section className={`sponsor-tier tier-${tier}`} key={tier}>
            <header className="tier-heading">
              <div>
                <span>{TIER_SUBTITLES[tier]}</span>
                <h3>{TIER_LABELS[tier]}</h3>
              </div>
              <b>{String(SPONSORS[tier].length).padStart(2, '0')}</b>
            </header>
            <div className="sponsor-grid">
              {SPONSORS[tier].map((sponsor) => (
                <SponsorCard key={sponsor.name} sponsor={sponsor} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <details className="original-board" data-reveal>
        <summary>عرض لوحة الرعاة الأصلية</summary>
        <img src="/assets/sponsors-board.jpeg" alt="لوحة الرعاة الأصلية كما اعتمدتها لجنة الحفل" />
        <p>اللوحة الأصلية هي المرجع النهائي للأسماء والترتيب. أضيفت الروابط فقط عندما ظهر تطابق واضح في البحث.</p>
      </details>
    </section>
  )
}
