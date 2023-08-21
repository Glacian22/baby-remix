import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAtom } from 'jotai'
import { firstNamesAtom } from '../../lib/atom';
import { IName } from '../../lib/atom'

const FirstName = () => {
  const [names, setNames] = useAtom(firstNamesAtom)
  const [form, setForm] = useState<IName>({ name: '', type: 'first' })

  const acceptHandler = (e: any) => {
    e.preventDefault()
    setNames([...names, { name: form.name, type: form.type }]);
    setForm({...form, name: ''})
  }

  const formHandler = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const mapNames = () => {
    return names.map((x, i) => {
      return (
        <div key={i}>
          <button onClick={() => setNames([...names.slice(0, i), ...names.slice(i + 1, names.length)])}>x</button>
          {x.name} | {x.type}
        </div>
      )
    })
  }

  return (
    <>
      <form>
        <div>
          <span className='label'>name</span>
          <input type='text' name='name' value={form.name} onChange={formHandler}></input>
        </div>
        <div>
          <span className='label'>can be</span>
          <select name='type' value={form.type} onChange={formHandler}>
            <option value='first'>first name</option>
            <option value='middle'>middle name</option>
            <option value='either'>either</option>
          </select>
        </div>
        <button type='submit' onClick={acceptHandler}>accept</button>
      </form>
      <Link to={'/lastname'}>Next</Link>
      <div id='names'>{mapNames()}</div>
    </>
  )
}

export default FirstName