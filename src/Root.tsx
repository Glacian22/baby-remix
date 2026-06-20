import { withLDProvider } from 'launchdarkly-react-client-sdk'
import App from './App.tsx'

// Wraps the app in the LaunchDarkly provider. Kept in its own module so App.tsx
// exports only a component (keeps Fast Refresh happy).
// Defaults to the production environment's client-side ID. Override per
// environment via VITE_LD_CLIENT_ID (e.g. .env.local pointing at test).
const clientSideID = import.meta.env.VITE_LD_CLIENT_ID ?? '65d4351a4ab156101d38e031'

const Root = withLDProvider({
  clientSideID,
  context: {
    kind: "user",
    anonymous: true,
    screenWidth: window.innerWidth
  },
  flags: {
    "welcome-text": "Welcome to the baby name mixer!",
    "enableUiTheme": false,
    "enable-darkest-mode": false,
    // Monetization features. These flags exist in LaunchDarkly (abrams-project),
    // currently OFF in all envs. Bootstrap defaults match that; flip the flag in
    // LD (e.g. the test env) to preview, then roll out deliberately.
    "enable-email-capture": false,
    "enable-keepsake-cta": false,
    // Gate the export buttons (Mix + Favorites). OFF everywhere in LD; enable
    // in test to preview.
    "enable-export": false
  },
  options: {
    bootstrap: 'localStorage',
  }
})(App)

export default Root
