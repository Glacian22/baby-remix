# Baby Remix

A small single-page app for brainstorming baby names. Enter a pool of first/middle
names and a last name, then "mix" them into random full-name combinations to hear how
they sound together.

## Flow

1. **Home** – intro screen (welcome text is driven by a LaunchDarkly flag).
2. **First names** – add candidate names, each tagged as `first`, `middle`, or `either`.
3. **Last name** – add one or more last names.
4. **Mix** – generate random combinations. Settings control how many middle names to
   include and whether to append the last name.

## Tech

- **React 18** + **TypeScript** + **Vite** (SWC)
- **Jotai** for state (with `atomWithStorage` for the theme)
- **framer-motion** for page/list transitions
- **react-router-dom v5** for routing
- **react-bootstrap** for the settings modal
- **LaunchDarkly** for feature flags (welcome text, UI theme toggle, "darkest" mode)
- Component-scoped CSS via `rollup-plugin-react-scoped-css`

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run lint     # eslint (zero warnings allowed)
npm run preview  # preview the production build
```
