import type { LDClient } from 'launchdarkly-react-client-sdk'

// Affiliate program IDs. Leave blank and the links still work as plain merchant
// searches — fill these in once you've joined each program (Amazon Associates,
// Zazzle, Etsy via Awin) to start earning a commission on referred sales.
const AFFILIATE = {
  zazzle: '', // Zazzle referral id — appended as ?rf=
  amazon: '', // Amazon Associates tag — appended as ?tag=
}

type Merchant = 'etsy' | 'zazzle' | 'amazon'

export interface KeepsakeProduct {
  id: string
  label: string
  // Marketplace prices drift and we don't control them, so we show an honest
  // "from" estimate rather than a fixed price.
  priceFrom: string
  merchant: Merchant
  query: (name: string) => string
}

// The catalog. Each entry deep-links into a real marketplace search with the
// baby name pre-filled. Swap merchants/queries here without touching the UI.
export const KEEPSAKE_PRODUCTS: KeepsakeProduct[] = [
  {
    id: 'nursery-print',
    label: 'Nursery print',
    priceFrom: 'from $18',
    merchant: 'etsy',
    query: (name) => `custom name nursery print ${name}`,
  },
  {
    id: 'name-blanket',
    label: 'Name blanket',
    priceFrom: 'from $30',
    merchant: 'zazzle',
    query: (name) => `personalized baby name blanket ${name}`,
  },
  {
    id: 'birth-announcement',
    label: 'Birth announcement',
    priceFrom: 'from $15',
    merchant: 'etsy',
    query: (name) => `birth announcement card ${name}`,
  },
]

// Build the outbound URL for a product, pre-filling the name and attaching the
// affiliate id for that merchant when one is configured.
export const buildKeepsakeUrl = (product: KeepsakeProduct, name: string): string => {
  const query = product.query(name)
  switch (product.merchant) {
    case 'zazzle': {
      const url = new URL(`https://www.zazzle.com/s/${encodeURIComponent(query)}`)
      if (AFFILIATE.zazzle) url.searchParams.set('rf', AFFILIATE.zazzle)
      return url.toString()
    }
    case 'amazon': {
      const url = new URL('https://www.amazon.com/s')
      url.searchParams.set('k', query)
      if (AFFILIATE.amazon) url.searchParams.set('tag', AFFILIATE.amazon)
      return url.toString()
    }
    case 'etsy':
    default: {
      // Etsy's affiliate program runs through Awin deep links; once you have a
      // publisher id, wrap this URL with your Awin redirect here.
      const url = new URL('https://www.etsy.com/search')
      url.searchParams.set('q', query)
      return url.toString()
    }
  }
}

const CLICK_STORAGE_KEY = 'keepsake-clicks'

// Record a keepsake click so we can judge whether the CTA is worth investing in
// (e.g. graduating to a real print-on-demand store). Fires a LaunchDarkly custom
// event for analytics and keeps a localStorage tally as a no-backend fallback.
export const trackKeepsakeClick = (
  ldClient: LDClient | undefined,
  product: KeepsakeProduct,
  name: string,
): void => {
  ldClient?.track('keepsake-click', {
    productId: product.id,
    merchant: product.merchant,
    name,
  })

  try {
    const existing = JSON.parse(localStorage.getItem(CLICK_STORAGE_KEY) ?? '[]')
    existing.push({ productId: product.id, merchant: product.merchant, name, at: new Date().toISOString() })
    localStorage.setItem(CLICK_STORAGE_KEY, JSON.stringify(existing))
  } catch {
    // tracking is best-effort — never block the outbound click
  }
}
