import { useState } from 'react'
import Button from '../../components/Button'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { firstNamesAtom } from '../../lib/atom';
import { IName } from '../../lib/atom'
import { variants, itemVariants, selectVariants, selectItemVariants, listVariants} from '../../lib/anims'
import '../firstLastName.scoped.css'

const FirstName = () => {
  const [names, setNames] = useAtom(firstNamesAtom)
  const [form, setForm] = useState<IName>({ name: '', type: 'first' })

  const acceptHandler = (e: any) => {
    e.preventDefault()
    const trimmed = form.name.trim()
    if (trimmed.length === 0) {
      return
    }
    
    setNames([{ name: trimmed, type: form.type }, ...names])
    setForm({ ...form, name: '' })
  }

  const formHandler = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const mapNames = () => {
    return names.map((x, i) => {
      return (
        <motion.div key={i} variants={listVariants}>
          <button onClick={() => setNames([...names.slice(0, i), ...names.slice(i + 1, names.length)])}><span>X</span></button>
          {x.name}, {x.type} 
        </motion.div>
      )
    })
  }

  // TODO: make fun animated select, also avoids the firefox select option font bug

  return (
    <motion.div className='add-name-page' variants={variants} animate='enter' exit='exit' initial='initial'>
      <motion.div variants={itemVariants} key='next-btn' id='back'>
        <Button to={''} variant='square'>Back</Button>
      </motion.div>
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
        <motion.button type='submit' onClick={acceptHandler} variants={itemVariants} key='fname-accept' className='add'>add that name!</motion.button>
      </form>
      <motion.div className='names' variants={itemVariants} key='names-list'>{mapNames()}</motion.div>
      <motion.div variants={itemVariants} key='next-btn' id='next'>
        <Button to={'lastname'} variant='square'>Next</Button>
      </motion.div>
    </motion.div>
  )
}

export default FirstName