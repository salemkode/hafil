/** فاصل بصري: عام التخرج بخط مفرّغ وظلّ لوني مزدوج */
export function YearInterlude() {
  return (
    <section className="year-section" aria-label="عام التخرج">
      <div className="year-lines" aria-hidden />
      <div className="year-content" data-reveal>
        <p>رحلة من 2025 إلى 2026</p>
        <h2>2026</h2>
        <span>والبداية من هنا</span>
      </div>
    </section>
  )
}
