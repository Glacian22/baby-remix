import { useAtom } from 'jotai'
import { firstNamesAtom, lastNamesAtom, mixedNamesAtom, favoritesAtom } from '../lib/atom'
import './clearAllButton.scoped.css'

const ClearAllButton = () => {
  const [, setFirstNames] = useAtom(firstNamesAtom)
  const [, setLastNames] = useAtom(lastNamesAtom)
  const [, setMixedNames] = useAtom(mixedNamesAtom)
  const [, setFavorites] = useAtom(favoritesAtom)

  const clearAll = () => {
    if (!window.confirm('Clear all names and favorites? This cannot be undone.')) return
    // resetting these atomWithStorage atoms wipes both state and localStorage
    setFirstNames([])
    setLastNames([])
    setMixedNames([])
    setFavorites([])
  }

  return (
    <button className='clear-all-btn' onClick={clearAll}>clear all</button>
  )
}

export default ClearAllButton
