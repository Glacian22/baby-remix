import { atom } from "jotai"
import { atomWithStorage } from 'jotai/utils'

export interface IName {
  name: string;
  type: 'first' | 'middle' | 'either'
}

export const firstNamesAtom = atomWithStorage<IName[]>('firstNames', [])
export const lastNamesAtom = atomWithStorage<string[]>('lastNames', [])
export const mixedNamesAtom = atomWithStorage<string[]>('mixedNames', [])
export const favoritesAtom = atomWithStorage<string[]>('favorites', [])

const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = defaultDark ? 'dark' : 'light'
export const themeAtom = atomWithStorage('theme', theme)

export const locationHistAtom = atom('')