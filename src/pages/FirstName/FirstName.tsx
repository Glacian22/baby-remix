import React, { useState } from 'react'

interface IName {
  name: string;
  type: 'first' | 'middle' | 'either'
}
const FirstName = () => {
  const formDefault: IName = {name: '', type: 'first'}

  const [names, setNames] = useState<IName[]>([])
  const [form, setForm] = useState<IName>(formDefault)

  const acceptHandler = (e: any) => {
    e.preventDefault()
    setNames([...names, { name: form.name, type: form.type }]);
    setForm(formDefault)
  }

  const formHandler = (e: any) => {
    console.log(e)
    setForm({ ...form, [e.target.name]: e.target.value })
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
            <option value='middle'>last name</option>
            <option value='either'>either</option>
          </select>
        </div>
        <button type='submit' onClick={acceptHandler}>accept</button>
      </form>
      <button>Next</button>
      {/* <div id='names'>{names.map(x => <div>{x.name}</div>)}</div> */}
      <div id='names'>{names.map(x => <div>{x.name}, {x.type}</div>)}</div>
    </>
  )
}

export default FirstName