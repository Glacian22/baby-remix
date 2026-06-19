import { withLDProvider } from 'launchdarkly-react-client-sdk'
import App from './App.tsx'

// Wraps the app in the LaunchDarkly provider. Kept in its own module so App.tsx
// exports only a component (keeps Fast Refresh happy).
const Root = withLDProvider({
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
  }
})(App)

export default Root
