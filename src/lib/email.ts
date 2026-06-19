const SIGNUP_STORAGE_KEY = 'shortlist-signups'

export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

// Submit a shortlist signup. In production on Netlify this is captured by
// Netlify Forms (see the hidden "shortlist" form in index.html). When that POST
// isn't handled — e.g. local dev — it falls back to localStorage so the flow
// stays demoable. Swap the fetch target for your ESP (Mailchimp/ConvertKit) if
// you'd rather send the email yourself.
export const submitShortlist = async (email: string, names: string[]): Promise<boolean> => {
  const body = new URLSearchParams({
    'form-name': 'shortlist',
    email: email.trim(),
    names: names.join(', '),
  }).toString()

  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    if (res.ok) return true
  } catch {
    // fall through to the local fallback below
  }

  try {
    const existing = JSON.parse(localStorage.getItem(SIGNUP_STORAGE_KEY) ?? '[]')
    existing.push({ email: email.trim(), names })
    localStorage.setItem(SIGNUP_STORAGE_KEY, JSON.stringify(existing))
    return true
  } catch {
    return false
  }
}
