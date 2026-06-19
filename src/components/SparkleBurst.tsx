import { motion, useReducedMotion } from 'framer-motion'
import './sparkleBurst.scoped.css'

interface Sparkle {
  left: string
  top: string
  size: number
  delay: number
  rotate: number
}

// Scattered around the name's bounding box (values outside 0–100% sit just
// beyond the edges). Varied size/rotation/delay keeps it feeling hand-drawn.
const SPARKLES: Sparkle[] = [
  { left: '-4%', top: '22%', size: 20, delay: 0, rotate: -20 },
  { left: '14%', top: '-16%', size: 15, delay: 0.1, rotate: 16 },
  { left: '50%', top: '-22%', size: 22, delay: 0.04, rotate: -8 },
  { left: '84%', top: '-12%', size: 14, delay: 0.16, rotate: 24 },
  { left: '103%', top: '32%', size: 20, delay: 0.08, rotate: -18 },
  { left: '90%', top: '90%', size: 17, delay: 0.18, rotate: 12 },
  { left: '42%', top: '106%', size: 14, delay: 0.13, rotate: -22 },
  { left: '6%', top: '94%', size: 18, delay: 0.22, rotate: 18 },
]

// A four-point twinkle drawn with concave curves for a sketched feel.
const SPARKLE_PATH =
  'M12 1 C12.5 8 16 11.5 23 12 C16 12.5 12.5 16 12 23 C11.5 16 8 12.5 1 12 C8 11.5 11.5 8 12 1 Z'

const SparkleBurst = () => {
  // Honor the OS "reduce motion" setting — no burst for those users.
  if (useReducedMotion()) return null

  return (
    <span className='sparkle-burst' aria-hidden='true'>
    {SPARKLES.map((s, i) =>
      <span key={i} className='sparkle' style={{ left: s.left, top: s.top }}>
        <motion.span
          className='sparkle-anim'
          initial={{ scale: 0, opacity: 0, rotate: s.rotate }}
          animate={{ scale: [0, 1.15, 0.9, 0], opacity: [0, 1, 1, 0], rotate: s.rotate + 16 }}
          transition={{ duration: 0.85, delay: s.delay, ease: 'easeOut', times: [0, 0.4, 0.7, 1] }}
        >
          <svg width={s.size} height={s.size} viewBox='0 0 24 24' fill='none'>
            <path
              d={SPARKLE_PATH}
              stroke='currentColor'
              strokeWidth={1.6}
              strokeLinejoin='round'
              strokeLinecap='round'
            />
          </svg>
        </motion.span>
      </span>
    )}
    </span>
  )
}

export default SparkleBurst
