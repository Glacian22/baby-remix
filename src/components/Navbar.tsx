import { themeAtom } from "../lib/atom"
import { useAtom } from "jotai"


const Navbar = () => {
  const [theme, setTheme] = useAtom(themeAtom)

  return (
    <nav>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'goth' : 'light')}>theme</button>
    </nav>
  )
}

export default Navbar