import { atom } from "jotai"
import { atomWithStorage } from 'jotai/utils'

export interface IName {
  name: string;
  type: 'first' | 'middle' | 'either'
}

export const firstNamesAtom = atom<IName[]>([])
export const lastNamesAtom = atom<string[]>([])

const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let theme = defaultDark ? 'dark' : 'light'
export const themeAtom = atomWithStorage('theme', theme)