import { useEffect, useRef } from 'react'

/** شريط تقدم القراءة: سايان → ذهبي → أحمر */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? Math.min(window.scrollY / total, 1) : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="scroll-progress" aria-hidden>
      <div ref={barRef} />
    </div>
  )
}
