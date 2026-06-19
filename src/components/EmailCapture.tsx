import { useState, ChangeEvent, FormEvent } from 'react'
import { isValidEmail, submitShortlist } from '../lib/email'
import './emailCapture.scoped.css'

interface Props {
  names: string[]
}

type Status = 'idle' | 'sending' | 'done' | 'error'

const EmailCapture = ({ names }: Props) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (status === 'error') setStatus('idle')
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setStatus('error')
      return
    }
    setStatus('sending')
    setStatus(await submitShortlist(email, names) ? 'done' : 'error')
  }

  if (status === 'done') {
    return (
      <div className='email-capture done'>
        Sent! Your shortlist is on its way to {email}.
      </div>
    )
  }

  return (
    <form className='email-capture' onSubmit={submit}>
      <span className='email-prompt'>Email me my shortlist</span>
      <div className='email-row'>
        <input
          type='email'
          placeholder='you@example.com'
          value={email}
          onChange={onChange}
          aria-label='Email address'
        />
        <button type='submit' disabled={status === 'sending'}>
          {status === 'sending' ? 'sending…' : 'send'}
        </button>
      </div>
      {status === 'error'
        ? <span className='email-note error'>Enter a valid email and try again.</span>
        : <span className='email-note'>We'll only use this to send your shortlist.</span>
      }
    </form>
  )
}

export default EmailCapture
