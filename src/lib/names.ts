// Derive the monogram (initials) from a full name, in spoken order.
export const getInitials = (fullName: string): string =>
  fullName
    .trim()
    .split(/\s+/)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('')

// Initial combinations worth warning a parent about. Easily extended.
const UNFORTUNATE_MONOGRAMS = new Set([
  'ASS', 'BJ', 'BM', 'BO', 'BS', 'DUI', 'FAG', 'FAT', 'GAS', 'HAG',
  'KKK', 'OMG', 'PEE', 'PMS', 'POO', 'RAT', 'SOB', 'STD', 'WTF',
])

// True when the full name's initials spell something a kid might get teased for.
export const isUnfortunateMonogram = (fullName: string): boolean =>
  UNFORTUNATE_MONOGRAMS.has(getInitials(fullName))
