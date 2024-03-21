import { useEffect } from "react"
import { themeAtom } from "../lib/atom"
import { useAtom } from "jotai"
import { useFlags } from 'launchdarkly-react-client-sdk'
import './navbar.scoped.css'


const Navbar = () => {
  const [theme, setTheme] = useAtom(themeAtom)
  const { enableUiTheme, enableDarkestMode } = useFlags()

  useEffect(() => {
    if (!enableUiTheme) setTheme('light')
  }, [enableUiTheme])

  useEffect(() => {
    if (!enableDarkestMode && theme === 'goth') setTheme('light')
  }, [enableDarkestMode, theme])

  return (
    <nav>
      <div className='app-width'>
        <span>Baby Mix!</span>
        {enableUiTheme &&
          <button id='theme-btn' onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'goth' : 'light')}>{theme}</button>
        }
      </div>
    </nav>
  )
}

export default Navbar