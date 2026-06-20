import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDebounce } from 'use-debounce';
import Navbar from "./components/Navbar";
import ClearAllButton from "./components/ClearAllButton";
import Routes from "./Routes";
import { themeAtom } from "./lib/atom";
import { useAtom } from "jotai"
import { useLDClient } from "launchdarkly-react-client-sdk";
import './App.scoped.css'
import './App.global.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [theme] = useAtom(themeAtom)
  const [width, setWidth] = useState(window.innerWidth);
  const [dWidth] = useDebounce(width, 100);
  const ldClient = useLDClient();

  // register the resize listener once
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  // re-identify with LaunchDarkly when the debounced width settles
  useEffect(() => {
    ldClient?.identify({
      kind: "user",
      anonymous: true,
      screenWidth: dWidth
    });
  }, [dWidth, ldClient])

  return (
    <div className="app-global" data-theme={theme}>
      <div className=" app-content">
        <Router>
          <Navbar />
          <div id="content-wrap">
            <Routes />
          </div>
        </Router>
        <ClearAllButton />
      </div>
    </div >
  )
}

export default App
