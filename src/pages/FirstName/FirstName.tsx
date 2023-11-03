import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { firstNamesAtom } from '../../lib/atom';
import { IName } from '../../lib/atom'
import { variants, itemVariants } from '../../lib/anims'
import './firstName.scoped.css'

const FirstName = () => {
  const [names, setNames] = useAtom(firstNamesAtom)
  const [form, setForm] = useState<IName>({ name: '', type: 'first' })

  const acceptHandler = (e: any) => {
    e.preventDefault()
    const trimmed = form.name.trim()
    if (trimmed.length === 0) {
      return
    }
    setNames([...names, { name: trimmed, type: form.type }])
    setForm({ ...form, name: '' })
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
    <motion.div id='first-name' variants={variants} animate='enter' exit='exit' initial='initial'>
      <form>
        <motion.div variants={itemVariants} key='fname'>
          <span className='label'>name</span>
          <input id='fname-input' type='text' name='name' value={form.name} onChange={formHandler}></input>
        </motion.div>
        <motion.div variants={itemVariants} key='fname-select'>
          <span className='label'>can be</span>
          <select name='type' value={form.type} onChange={formHandler}>
            <option value='first'>first name</option>
            <option value='middle'>middle name</option>
            <option value='either'>either</option>
          </select>
        </motion.div>
        <motion.button type='submit' onClick={acceptHandler} variants={itemVariants} key='fname-accept'>accept</motion.button>
      </form>
      <motion.div id='names' variants={itemVariants} key='names-list'>{mapNames()}</motion.div>
      <motion.div variants={itemVariants} key='next-btn'>
        <Link to={'/lastname'}>Next</Link>
      </motion.div>
    </motion.div>
  )
}

export default FirstName