import { useState } from 'react'
import { getInitials } from '../lib/names'
import './keepsakeCta.scoped.css'

interface Props {
  name: string
}

// MOCKUP ONLY — placeholder products to evaluate placement. Wire each to a real
// affiliate / print-on-demand link (Etsy, Minted, Printful, …) before launch.
const PRODUCTS = [
  { label: 'Nursery print', price: '$24' },
  { label: 'Name blanket', price: '$36' },
  { label: 'Birth announcement', price: '$18' },
]

const KeepsakeCta = ({ name }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='keepsake'>
      <button className='keepsake-toggle' onClick={() => setOpen(!open)}>
        🎁 Make a keepsake
      </button>
      {open &&
        <div className='keepsake-panel'>
          <div className='keepsake-preview'>
            <span className='keepsake-monogram'>{getInitials(name)}</span>
            <span className='keepsake-name'>{name}</span>
          </div>
          <div className='keepsake-products'>
            {PRODUCTS.map((product) =>
              <a
                key={product.label}
                className='keepsake-product'
                href='#'
                onClick={(e) => e.preventDefault()}
              >
                <span>{product.label}</span>
                <span className='keepsake-price'>{product.price}</span>
              </a>
            )}
          </div>
          <span className='keepsake-disclaimer'>
            Mock placement · we may earn a commission on purchases
          </span>
        </div>
      }
    </div>
  )
}

export default KeepsakeCta
