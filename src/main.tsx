import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk'

// (async () => {
//   const LDProvider = await asyncWithLDProvider({
//     clientSideID: '65d4351a4ab156101d38e031',
//     context: {
//       kind: "user",
//       anonymous: true,
//       screenWidth: window.innerWidth
//     },
//     flags: {
//       "welcome-text": "Welcome to the mixer!",
//       "enableUiTheme": true,
//       "enable-darkest-mode": false
//     }
//     ,
//     options: {
//       streamUrl: 'http://localhost:8765',
//       baseUrl: 'http://localhost:8765',
//       eventsUrl: 'http://localhost:8765'
//     }
//   });

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      {/* <LDProvider> */}
        <App />
      {/* </LDProvider> */}
    </React.StrictMode>,
  )
// })();
