import { useEffect, useState } from 'react'

export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

function diff(target: number): CountdownParts {
  const ms = target - Date.now()
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1_000) % 60,
    done: false,
  }
}

export function useCountdown(targetIso: string): CountdownParts {
  const target = new Date(targetIso).getTime()
  const [parts, setParts] = useState<CountdownParts>(() => diff(target))

  useEffect(() => {
    const t = setInterval(() => setParts(diff(target)), 1000)
    return () => clearInterval(t)
  }, [target])

  return parts
}
