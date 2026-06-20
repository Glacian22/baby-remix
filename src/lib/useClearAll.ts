import { useAtom } from 'jotai'
import { firstNamesAtom, lastNamesAtom, mixedNamesAtom, favoritesAtom } from './atom'

// Returns a function that confirms, then resets all name/favorite data.
// These atomWithStorage atoms wipe both state and localStorage; theme is kept.
// Returns true if the user confirmed and data was cleared.
export const useClearAll = () => {
  const [, setFirstNames] = useAtom(firstNamesAtom)
  const [, setLastNames] = useAtom(lastNamesAtom)
  const [, setMixedNames] = useAtom(mixedNamesAtom)
  const [, setFavorites] = useAtom(favoritesAtom)

  return (): boolean => {
    if (!window.confirm('Clear all names and favorites? This cannot be undone.')) return false
    setFirstNames([])
    setLastNames([])
    setMixedNames([])
    setFavorites([])
    return true
  }
}
