import { useState, MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { listVariants } from '../lib/anims'
import { getInitials, isUnfortunateMonogram } from '../lib/names'
import { copyToClipboard } from '../lib/io'
import './nameRow.scoped.css'

interface Props {
  name: string
  isFavorite: boolean
  onToggleFavorite: (name: string) => void
}

interface Flyer {
  fromX: number
  fromY: number
  dx: number
  dy: number
}

const NameRow = ({ name, isFavorite, onToggleFavorite }: Props) => {
  const [copied, setCopied] = useState(false)
  const [flyer, setFlyer] = useState<Flyer | null>(null)
  const reduceMotion = useReducedMotion()
  const flagged = isUnfortunateMonogram(name)

  const handleCopy = async () => {
    if (await copyToClipboard(name)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    }
  }

  const handleHeartClick = (e: MouseEvent<HTMLButtonElement>) => {
    // launch a heart that flies up to the navbar count — only when favoriting
    if (!isFavorite && !reduceMotion) {
      const navHeart = document.getElementById('nav-fav-heart')
      if (navHeart) {
        const s = e.currentTarget.getBoundingClientRect()
        const t = navHeart.getBoundingClientRect()
        const fromX = s.left + s.width / 2
        const fromY = s.top + s.height / 2
        setFlyer({
          fromX,
          fromY,
          dx: t.left + t.width / 2 - fromX,
          dy: t.top + t.height / 2 - fromY,
        })
      }
    }
    onToggleFavorite(name)
  }

  return (
    <motion.div className='name-row' variants={listVariants}>
      <button
        className={isFavorite ? 'heart-btn fav' : 'heart-btn'}
        onClick={handleHeartClick}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '♥' : '♡'}
      </button>
      <span className='name-text'>{name}</span>
      {flagged &&
        <span className='monogram-warn' title={`Heads up: the initials spell "${getInitials(name)}"`}>
          {'⚠'}
        </span>
      }
      <button
        className='copy-btn'
        onClick={handleCopy}
        title='Copy name'
        aria-label='Copy name'
      >
        {copied ? '✓' : '⧉'}
      </button>
      {flyer && createPortal(
        <div
          className='heart-flyer'
          style={{ position: 'fixed', left: flyer.fromX, top: flyer.fromY, transform: 'translate(-50%, -50%)' }}
        >
          <motion.span
            initial={{ offsetDistance: '0%', opacity: 1 }}
            animate={{ offsetDistance: '100%', opacity: 0.4 }}
            // single eased scalar along a quadratic path = smooth acceleration;
            // control point up-and-left makes it bow out left, then sweep to top-right
            transition={{ duration: 0.9, ease: 'easeIn' }}
            onAnimationComplete={() => setFlyer(null)}
            style={{
              display: 'inline-block',
              offsetPath: `path('M 0 0 Q ${-Math.min(60, Math.max(15, Math.abs(flyer.dy) * 0.2))} ${flyer.dy} ${flyer.dx} ${flyer.dy}')`,
              offsetRotate: '0deg',
            }}
          >
            ♥
          </motion.span>
        </div>,
        document.body
      )}
    </motion.div>
  )
}

export default NameRow
