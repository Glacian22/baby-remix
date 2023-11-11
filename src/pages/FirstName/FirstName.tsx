import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { firstNamesAtom } from '../../lib/atom';
import { IName } from '../../lib/atom'
import { variants, itemVariants, selectVariants, selectItemVariants } from '../../lib/anims'
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

  //TODO: make fun animated select element

  return (
    <motion.div id='first-name' variants={variants} animate='enter' exit='exit' initial='initial'>
      <form>
        <motion.div variants={itemVariants} key='fname'>
          <label htmlFor='fname-input' className='label'>name</label>
          <input id='fname-input' type='text' name='name' value={form.name} onChange={formHandler}></input>
        </motion.div>
        <motion.div variants={itemVariants} key='fname-select'>
          <label htmlFor='type' className='label'>can be</label>
          <motion.select id='type' name='type' value={form.type} onChange={formHandler} variants={selectVariants} initial='initial' animate='open'>
            <motion.option value='first' key='first' variants={selectItemVariants}>first name</motion.option>
            <motion.option value='middle' key='middle' variants={selectItemVariants}>middle name</motion.option>
            <motion.option value='either' key='either' variants={selectItemVariants}>either</motion.option>
          </motion.select>
        </motion.div>
        <motion.button type='submit' onClick={acceptHandler} variants={itemVariants} key='fname-accept'>add that name!</motion.button>
      </form>
      <motion.div id='names' variants={itemVariants} key='names-list'>{mapNames()}</motion.div>
      <motion.div variants={itemVariants} key='next-btn'>
        <Link to={'/lastname'}>Next</Link>
      </motion.div>
    </motion.div>
  )
}

export default FirstName