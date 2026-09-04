import { EVENT } from '../data/event'
import { Countdown } from './Countdown'

function icsHref(): string {
  const start = new Date(EVENT.targetDate)
  const end = new Date(start.getTime() + 3 * 3_600_000)
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//BWxCX-2026//AR',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@bwcx-2026`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    'SUMMARY:حفل تخرج BrainWare × Cyber-X',
    `LOCATION:${EVENT.venue}\\, ${EVENT.city}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(lines.join('\r\n'))
}

export function EventCard() {
  return (
    <section className="event-section" id="details">
      <div className="section-heading" data-reveal>
        <p className="section-index">03 · موعدنا</p>
        <h2>
          صباح يُكتب <span>في الذاكرة</span>
        </h2>
      </div>

      <div className="event-card" data-reveal>
        <div className="event-date-block">
          <span>{EVENT.month}</span>
          <strong>{EVENT.day}</strong>
          <b>{EVENT.year}</b>
        </div>

        <div className="event-copy">
          <p className="event-day">{EVENT.dayName}</p>
          <h3>حفل تخرّج BrainWare × Cyber-X</h3>
          <p className="event-place">
            {EVENT.venue} · {EVENT.city}
          </p>
          <p className="event-note">{EVENT.college}</p>

          <Countdown />

          <div className="event-actions">
            <a className="action-button primary" href={EVENT.mapsUrl} target="_blank" rel="noreferrer">
              الموقع على الخريطة ↗
            </a>
            <a className="action-button" href={icsHref()} download="bwcx-2026.ics">
              أضف إلى التقويم ↓
            </a>
            <a className="action-button" href="#wall">
              اكتب تهنئتك ✦
            </a>
          </div>
        </div>

        <div className="event-seal" aria-label="العام الجامعي">
          <span>العام الجامعي</span>
          <b>{EVENT.academicYear}</b>
        </div>
      </div>
    </section>
  )
}
