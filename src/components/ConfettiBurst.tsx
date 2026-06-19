import { motion, useReducedMotion } from 'framer-motion'
import './confettiBurst.scoped.css'

interface Ribbon {
  left: string    // anchor (near end) around the name's box
  top: string
  angle: number   // outward direction, degrees (0 = right, 90 = down)
  length: number  // how far it extends, px
  delay: number
}

// Anchors spread around the whole name's perimeter, each line pointing outward.
const RIBBONS: Ribbon[] = [
  { left: '12%', top: '2%', angle: -125, length: 22, delay: 0.02 },
  { left: '38%', top: '-2%', angle: -98, length: 26, delay: 0.07 },
  { left: '62%', top: '-2%', angle: -78, length: 24, delay: 0 },
  { left: '86%', top: '2%', angle: -52, length: 20, delay: 0.09 },
  { left: '100%', top: '28%', angle: -18, length: 26, delay: 0.04 },
  { left: '101%', top: '62%', angle: 22, length: 20, delay: 0.11 },
  { left: '84%', top: '100%', angle: 58, length: 22, delay: 0.03 },
  { left: '56%', top: '102%', angle: 92, length: 28, delay: 0.08 },
  { left: '30%', top: '100%', angle: 122, length: 22, delay: 0.05 },
  { left: '2%', top: '70%', angle: 158, length: 24, delay: 0.1 },
  { left: '-1%', top: '34%', angle: 198, length: 26, delay: 0.06 },
  { left: '10%', top: '4%', angle: 232, length: 18, delay: 0.12 },
]

// A gently squiggly stroke from x=0 to x=len, centered vertically in a 12-tall box.
const makeSquiggle = (len: number): string => {
  const mid = 6
  const amp = 3.5
  const humps = Math.max(2, Math.round(len / 11))
  const seg = len / humps
  let d = `M0 ${mid}`
  for (let i = 0; i < humps; i++) {
    const cx = (seg * (i + 0.5)).toFixed(1)
    const ex = (seg * (i + 1)).toFixed(1)
    const cy = (mid + (i % 2 === 0 ? -amp : amp)).toFixed(1)
    d += ` Q${cx} ${cy} ${ex} ${mid}`
  }
  return d
}

const ConfettiBurst = () => {
  // Honor the OS "reduce motion" setting — no burst for those users.
  if (useReducedMotion()) return null

  return (
    <span className='confetti-burst' aria-hidden='true'>
      {RIBBONS.map((r, i) =>
        <span key={i} className='ribbon' style={{ left: r.left, top: r.top }}>
          <span className='ribbon-rot' style={{ transform: `rotate(${r.angle}deg)` }}>
            <svg width={r.length} height={12} viewBox={`0 0 ${r.length} 12`} fill='none'>
              <motion.path
                d={makeSquiggle(r.length)}
                stroke='white'
                strokeWidth={2.5}
                strokeLinecap='round'
                initial={{ pathLength: 0, pathOffset: 0, opacity: 1 }}
                // draw outward (0 → 0.45), then erase from the near end while fading
                // (0.45 → 0.95): pathOffset rises and pathLength shrinks so the start
                // point recedes outward while the far end stays put, and opacity falls.
                animate={{
                  pathLength: [0, 1, 0, 0],
                  pathOffset: [0, 0, 1, 1],
                  opacity: [1, 1, 0, 0],
                }}
                transition={{ duration: 0.6, delay: r.delay, ease: [0.83, 0, 0.17, 1], times: [0, 0.45, 0.95, 1] }}
              />
            </svg>
          </span>
        </span>
      )}
    </span>
  )
}

export default ConfettiBurst
