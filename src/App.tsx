import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDebounce } from 'use-debounce';
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import { themeAtom } from "./lib/atom";
import { useAtom } from "jotai"
import { withLDProvider, useLDClient } from "launchdarkly-react-client-sdk";
import './App.scoped.css'
import './App.global.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [theme] = useAtom(themeAtom)
  const [width, setWidth] = useState(window.innerWidth);
  const [dWidth] = useDebounce(width, 100);
  const ldClient = useLDClient();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    
    ldClient?.identify({
      kind: "user",
      anonymous: true,
      screenWidth: width
    });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dWidth])

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
    bootstrap: 'localStorage',
    // streamUrl: 'https://127.0.0.1:8030',
    // baseUrl: 'https://127.0.0.1:8030',
    // eventsUrl: 'https://127.0.0.1:8030'
  }
})(App)
