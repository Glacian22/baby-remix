import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import { themeAtom } from "./lib/atom";
import { useAtom } from "jotai"
import { withLDProvider } from "launchdarkly-react-client-sdk";
import './App.scoped.css'
import './App.global.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [theme] = useAtom(themeAtom)

  return (
    <div className="app-global" data-theme={theme}>
      <div className=" app-content">
        <Router>
          <Navbar />
          <div id="content-wrap">
            <Routes />
          </div>
        </Router>
      </div>
    </div >
  )
}

export default withLDProvider({
  clientSideID: '65d4351a4ab156101d38e031',
  context: {
    kind: "user",
    anonymous: true,
    screenWidth: window.innerWidth
  },
  flags: {
    "welcome-text": "Welcome to the baby name mixer!",
    "enableUiTheme": false,
    "enable-darkest-mode": false
  },
  options: {
    bootstrap: 'localStorage'
  }
})(App)
