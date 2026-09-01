import { useCallback, useEffect, useRef, useState } from 'react'

/** صوت محيطي هادئ مولّد بالمتصفح (Web Audio) — بلا ملفات */
function SoundButton() {
  const [soundOn, setSoundOn] = useState(false)
  const audioRef = useRef<{
    context: AudioContext
    gain: GainNode
    oscillators: OscillatorNode[]
  } | null>(null)

  const stopSound = useCallback(() => {
    const current = audioRef.current
    if (!current) return
    const now = current.context.currentTime
    current.gain.gain.cancelScheduledValues(now)
    current.gain.gain.setValueAtTime(current.gain.gain.value, now)
    current.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45)
    window.setTimeout(() => {
      current.oscillators.forEach((oscillator) => oscillator.stop())
      void current.context.close()
    }, 500)
    audioRef.current = null
    setSoundOn(false)
  }, [])

  const toggleSound = () => {
    if (audioRef.current) {
      stopSound()
      return
    }

    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return

    const context = new AudioContextClass()
    const gain = context.createGain()
    gain.gain.setValueAtTime(0.0001, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.026, context.currentTime + 1.2)
    gain.connect(context.destination)

    const frequencies = [110, 164.81, 220]
    const oscillators = frequencies.map((frequency, index) => {
      const oscillator = context.createOscillator()
      const voiceGain = context.createGain()
      oscillator.type = index === 1 ? 'triangle' : 'sine'
      oscillator.frequency.value = frequency
      oscillator.detune.value = index * 3 - 3
      voiceGain.gain.value = index === 1 ? 0.28 : 0.2
      oscillator.connect(voiceGain).connect(gain)
      oscillator.start()
      return oscillator
    })

    audioRef.current = { context, gain, oscillators }
    setSoundOn(true)
  }

  useEffect(() => stopSound, [stopSound])

  return (
    <button
      className={`sound-button ${soundOn ? 'is-on' : ''}`}
      type="button"
      aria-pressed={soundOn}
      aria-label={soundOn ? 'إيقاف الصوت الهادئ' : 'تشغيل الصوت الهادئ'}
      onClick={toggleSound}
    >
      <span className="sound-bars" aria-hidden>
        <i />
        <i />
        <i />
      </span>
      <span>{soundOn ? 'الصوت يعمل' : 'تشغيل الصوت'}</span>
    </button>
  )
}

export function FloatingHeader() {
  return (
    <header className="floating-header">
      <a className="mini-brand" href="#top" aria-label="العودة إلى بداية الموقع">
        <span>BW</span>
        <i aria-hidden>×</i>
        <span>CX</span>
      </a>
      <SoundButton />
    </header>
  )
}
