import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { lastNamesAtom } from '../../lib/atom'
import { useAtom } from 'jotai'


const LastName = () => {
  const [names, setNames] = useAtom(lastNamesAtom)
  const [lName, setlName] = useState<string>('')

  const acceptHandler = (e: any) => {
    e.preventDefault()
    setNames([...names, lName]);
    setlName('')
  }

  const inputHandler = (e: any) => {
    setlName(e.target.value)
  }

  const mapNames = () => {
    return names.map((x, i) => {
      return (
        <div key={i}>
          <button onClick={() => setNames([...names.slice(0, i), ...names.slice(i + 1, names.length)])}>x</button>
          {x}
        </div>
      )
    })
  }

  return (
    <>
      <form>
        <div>
          <span className='label'>last name</span>
          <input type='text' name='name' value={lName} onChange={inputHandler}></input>
        </div>
        <button type='submit' onClick={acceptHandler}>accept</button>
      </form>
      <Link to={'/mix'}>Mix!</Link>
      <div id='names'>{mapNames()}</div>
    </>
  )
}

export default LastName