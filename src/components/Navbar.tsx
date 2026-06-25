import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useAnimationControls } from "framer-motion"
import { themeAtom, favoritesAtom } from "../lib/atom"
import { useAtom } from "jotai"
import { useFlags } from 'launchdarkly-react-client-sdk'
import './navbar.scoped.css'


const Navbar = () => {
  const [theme, setTheme] = useAtom(themeAtom)
  const [favorites] = useAtom(favoritesAtom)
  const { enableUiTheme, enableDarkestMode } = useFlags()

  // pop the heart + count when a favorite is added (not on load or removal)
  const favControls = useAnimationControls()
  const prevFavCount = useRef(favorites.length)
  useEffect(() => {
    if (favorites.length > prevFavCount.current) {
      favControls.start({
        scale: [0.85, 1.08, 0.96, 1],
        transition: { duration: 0.3, ease: 'easeOut', times: [0, 0.45, 0.7, 0.88, 1] },
      })
    }
    prevFavCount.current = favorites.length
  }, [favorites.length, favControls])

  // if not in light mode and theme button is disabled via flag, revert ui to light mode
  useEffect(() => {
    if (!enableUiTheme) setTheme('light')
  }, [enableUiTheme, setTheme])

  // if in goth mode and LD flag is disabled, cause the ui to revert to light mode
  useEffect(() => {
    if (!enableDarkestMode && theme === 'goth') setTheme('light')
  }, [enableDarkestMode, theme, setTheme])

  const nextTheme = () => {
    if (!enableDarkestMode){ 
      return theme === 'light' ? 'dark' : 'light'
    }
    else {
      return theme === 'light' ? 'dark' : theme === 'dark' ? 'goth' : 'light'
    }
  }

  return (
    <nav>
      <div className='app-width'>
        <Link id='nav-brand' to='/'>Baby Mix!</Link>
        <div className='nav-right'>
          <Link id='fav-link' to='/favorites'>
            <motion.span id='nav-fav-heart' animate={favControls} style={{ display: 'inline-block' }}>♥</motion.span> {favorites.length}
          </Link>
          {enableUiTheme &&
            <button id='theme-btn' onClick={() => setTheme(nextTheme())}>{theme}</button>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar