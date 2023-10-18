import { themeAtom } from "../lib/atom"
import { useAtom } from "jotai"
import './navbar.scoped.css'


const Navbar = () => {
  const [theme, setTheme] = useAtom(themeAtom)

  return (
    <nav>
      <div className='app-width'>
        <span>Baby Mix!</span>
        <button id='theme-btn' onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'goth' : 'light')}>{theme}</button>
      </div>
    </nav>
  )
}

export default Navbar