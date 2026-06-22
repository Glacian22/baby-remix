import { useState } from 'react'
import { useLDClient } from 'launchdarkly-react-client-sdk'
import { getInitials } from '../lib/names'
import { KEEPSAKE_PRODUCTS, buildKeepsakeUrl, trackKeepsakeClick } from '../lib/keepsake'
import './keepsakeCta.scoped.css'

interface Props {
  name: string
}

const KeepsakeCta = ({ name }: Props) => {
  const [open, setOpen] = useState(false)
  const ldClient = useLDClient()

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
            {KEEPSAKE_PRODUCTS.map((product) =>
              <a
                key={product.id}
                className='keepsake-product'
                href={buildKeepsakeUrl(product, name)}
                target='_blank'
                rel='noopener noreferrer sponsored'
                onClick={() => trackKeepsakeClick(ldClient, product, name)}
              >
                <span>{product.label}</span>
                <span className='keepsake-price'>{product.priceFrom}</span>
              </a>
            )}
          </div>
          <span className='keepsake-disclaimer'>
            Opens a shop with “{name}” pre-filled · we may earn a commission on purchases
          </span>
        </div>
      }
    </div>
  )
}

export default KeepsakeCta
