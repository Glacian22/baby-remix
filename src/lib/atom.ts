import { atom } from "jotai"

export interface IName {
  name: string;
  type: 'first' | 'middle' | 'either'
}

export const firstNamesAtom = atom<IName[]>([])
export const lastNamesAtom = atom<string[]>([])