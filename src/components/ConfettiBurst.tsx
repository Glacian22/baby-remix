import { motion, useReducedMotion } from 'framer-motion'
import './confettiBurst.scoped.css'

interface Ribbon {
  angle: number     // direction of travel, degrees (0 = right, 90 = down)
  distance: number  // how far it flies, px
  length: number    // ribbon length, px
  delay: number
  spin: number      // extra rotation while flying
}

// A handful of ribbons radiating in all directions off the name.
const RIBBONS: Ribbon[] = [
  { angle: -80, distance: 95, length: 30, delay: 0.02, spin: 35 },
  { angle: -50, distance: 80, length: 24, delay: 0.06, spin: -25 },
  { angle: -20, distance: 102, length: 34, delay: 0, spin: 30 },
  { angle: 18, distance: 85, length: 22, delay: 0.08, spin: -40 },
  { angle: 50, distance: 96, length: 28, delay: 0.04, spin: 20 },
  { angle: 95, distance: 78, length: 20, delay: 0.1, spin: -30 },
  { angle: 135, distance: 92, length: 30, delay: 0.05, spin: 25 },
  { angle: 168, distance: 84, length: 24, delay: 0.09, spin: -20 },
  { angle: 205, distance: 98, length: 32, delay: 0.03, spin: 35 },
  { angle: 250, distance: 80, length: 22, delay: 0.07, spin: -30 },
  { angle: 290, distance: 90, length: 26, delay: 0.01, spin: 30 },
  { angle: 325, distance: 86, length: 28, delay: 0.06, spin: -25 },
]

// A short wavy stroke — a little ribbon.
const RIBBON_PATH = 'M2 5 Q 12 1 20 5 T 38 5'

const ConfettiBurst = () => {
  // Honor the OS "reduce motion" setting — no burst for those users.
  if (useReducedMotion()) return null

  return (
    <span className='confetti-burst' aria-hidden='true'>
      {RIBBONS.map((r, i) => {
        const rad = (r.angle * Math.PI) / 180
        const dx = Math.cos(rad) * r.distance
        const dy = Math.sin(rad) * r.distance
        return (
          <span key={i} className='ribbon'>
            <motion.span
              className='ribbon-anim'
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.5, rotate: r.angle }}
              animate={{
                x: [0, dx * 0.8, dx, dx],
                y: [0, dy * 0.8, dy, dy],
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 1, 0.9],
                rotate: r.angle + r.spin,
              }}
              transition={{ duration: 0.7, delay: r.delay, ease: 'easeOut', times: [0, 0.25, 0.7, 1] }}
            >
              <svg width={r.length} height={10} viewBox='0 0 40 10' fill='none'>
                <path d={RIBBON_PATH} stroke='white' strokeWidth={3} strokeLinecap='round' />
              </svg>
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}

export default ConfettiBurst
