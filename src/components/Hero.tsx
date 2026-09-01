import { EVENT } from '../data/event'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden />
      <div className="orbit orbit-one" aria-hidden />
      <div className="orbit orbit-two" aria-hidden />
      <div className="hero-year" aria-hidden>
        2026
      </div>

      <div className="hero-copy" data-reveal>
        <p className="section-index">{EVENT.college}</p>
        <h2>
          <span>دفعتان.</span>
          <strong>لحظة واحدة.</strong>
        </h2>
        <p className="hero-description">
          نحتفل بمسارين مختلفين جمعتهما سنوات من التعلّم، وليلة واحدة تبدأ منها الحكاية التالية.
        </p>
        <a className="scroll-cue" href="#cohorts">
          <span>اكتشف الدفعتين</span>
          <i aria-hidden>↓</i>
        </a>
      </div>

      <div className="hero-signature" aria-hidden>
        <span>010011</span>
        <span>THINK · BUILD · DEFEND</span>
      </div>
    </section>
  )
}
