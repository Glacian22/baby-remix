import { useEffect } from "react"
import { Link } from "react-router-dom"
import { themeAtom, favoritesAtom } from "../lib/atom"
import { useAtom } from "jotai"
import { useFlags } from 'launchdarkly-react-client-sdk'
import './navbar.scoped.css'


const Navbar = () => {
  const [theme, setTheme] = useAtom(themeAtom)
  const [favorites] = useAtom(favoritesAtom)
  const { enableUiTheme, enableDarkestMode } = useFlags()

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
        <span>Baby Mix!</span>
        <div className='nav-right'>
          <Link id='fav-link' to='/favorites'>♥ {favorites.length}</Link>
          {enableUiTheme &&
            <button id='theme-btn' onClick={() => setTheme(nextTheme())}>{theme}</button>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar