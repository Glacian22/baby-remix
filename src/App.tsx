import {  BrowserRouter as Router} from "react-router-dom";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import { themeAtom } from "./lib/atom";
import { useAtom } from "jotai"
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

export default App
