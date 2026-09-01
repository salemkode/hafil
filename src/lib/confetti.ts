import confetti from 'canvas-confetti'

const GRAD_COLORS = ['#32d5ff', '#f02a4a', '#d8a929', '#ffffff']

export function burstCelebration() {
  const defaults = { colors: GRAD_COLORS, ticks: 220, gravity: 1.1, scalar: 1.05, zIndex: 200 }
  confetti({ ...defaults, particleCount: 90, spread: 75, origin: { x: 0.5, y: 0.35 } })
  setTimeout(() => confetti({ ...defaults, particleCount: 45, angle: 60, spread: 60, origin: { x: 0, y: 0.7 } }), 150)
  setTimeout(() => confetti({ ...defaults, particleCount: 45, angle: 120, spread: 60, origin: { x: 1, y: 0.7 } }), 300)
}

export function burstSmall(x = 0.5, y = 0.6) {
  confetti({
    colors: GRAD_COLORS,
    particleCount: 55,
    spread: 65,
    startVelocity: 28,
    scalar: 0.9,
    origin: { x, y },
    zIndex: 200,
  })
}
