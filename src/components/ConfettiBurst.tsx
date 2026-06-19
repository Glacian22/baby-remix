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
  { left: '12%', top: '2%', angle: -125, length: 34, delay: 0.02 },
  { left: '38%', top: '-2%', angle: -98, length: 42, delay: 0.07 },
  { left: '62%', top: '-2%', angle: -78, length: 38, delay: 0 },
  { left: '86%', top: '2%', angle: -52, length: 30, delay: 0.09 },
  { left: '100%', top: '28%', angle: -18, length: 40, delay: 0.04 },
  { left: '101%', top: '62%', angle: 22, length: 32, delay: 0.11 },
  { left: '84%', top: '100%', angle: 58, length: 36, delay: 0.03 },
  { left: '56%', top: '102%', angle: 92, length: 44, delay: 0.08 },
  { left: '30%', top: '100%', angle: 122, length: 34, delay: 0.05 },
  { left: '2%', top: '70%', angle: 158, length: 38, delay: 0.1 },
  { left: '-1%', top: '34%', angle: 198, length: 40, delay: 0.06 },
  { left: '10%', top: '4%', angle: 232, length: 30, delay: 0.12 },
]

const ConfettiBurst = () => {
  // Honor the OS "reduce motion" setting — no burst for those users.
  if (useReducedMotion()) return null

  return (
    <span className='confetti-burst' aria-hidden='true'>
      {RIBBONS.map((r, i) =>
        <span key={i} className='ribbon' style={{ left: r.left, top: r.top }}>
          <span className='ribbon-rot' style={{ transform: `rotate(${r.angle}deg)` }}>
            <svg width={r.length} height={6} viewBox={`0 0 ${r.length} 6`} fill='none'>
              <motion.path
                d={`M0 3 L ${r.length} 3`}
                stroke='white'
                strokeWidth={2.5}
                strokeLinecap='round'
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, delay: r.delay, ease: 'easeOut', times: [0, 0.45, 1] }}
              />
            </svg>
          </span>
        </span>
      )}
    </span>
  )
}

export default ConfettiBurst
