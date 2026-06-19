import { useState } from 'react'
import { motion } from 'framer-motion'
import { listVariants } from '../lib/anims'
import { getInitials, isUnfortunateMonogram } from '../lib/names'
import { copyToClipboard } from '../lib/io'
import './nameRow.scoped.css'

interface Props {
  name: string
  isFavorite: boolean
  onToggleFavorite: (name: string) => void
}

const NameRow = ({ name, isFavorite, onToggleFavorite }: Props) => {
  const [copied, setCopied] = useState(false)
  const flagged = isUnfortunateMonogram(name)

  const handleCopy = async () => {
    if (await copyToClipboard(name)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    }
  }

  return (
    <motion.div className='name-row' variants={listVariants}>
      <button
        className={isFavorite ? 'heart-btn fav' : 'heart-btn'}
        onClick={() => onToggleFavorite(name)}
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
    </motion.div>
  )
}

export default NameRow
