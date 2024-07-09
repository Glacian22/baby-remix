import { useState } from 'react'
import Button from '../../components/Button'
import { motion } from 'framer-motion'
import { lastNamesAtom } from '../../lib/atom'
import { variants, itemVariants } from '../../lib/anims'
import { useAtom } from 'jotai'
import "../firstLastName.scoped.css"


const LastName = () => {
  const [names, setNames] = useAtom(lastNamesAtom)
  const [lName, setlName] = useState<string>('')

  const acceptHandler = (e: any) => {
    e.preventDefault()
    const trimmed = lName.trim()
    if (trimmed.length === 0) {
      return
    }
    setNames([...names, lName]);
    setlName('')
  }

  const inputHandler = (e: any) => {
    setlName(e.target.value)
  }

  const mapNames = () => {
    return names.map((n, i) => {
      return (
        <div key={i}>
          <button onClick={() => setNames([...names.slice(0, i), ...names.slice(i + 1, names.length)])}>X</button>
          {n}
        </div>
      )
    })
  }

  return (
    <motion.div id='last-name' variants={variants} animate='enter' exit='exit' initial='initial'>
      <motion.div variants={itemVariants} key='next-btn' id='back'>
        <Button to={'firstname'} variant='square'>Back</Button>
      </motion.div>
      <form>
        <motion.div variants={itemVariants} key='lNameForm'>
          <span className='label'>last name</span>
          <input type='text' name='name' value={lName} onChange={inputHandler}></input>
        </motion.div>
        <motion.button type='submit' onClick={acceptHandler} variants={itemVariants} key='fname-accept' className='add'>add that name!</motion.button>
      </form>
      <motion.div variants={itemVariants} key='lName' id='names'>{mapNames()}</motion.div>
      <motion.div variants={itemVariants} key='next-btn' id='next'>
        <Button to={'lastname'} variant='square'>Next</Button>
      </motion.div>
    </motion.div>
  )
}

export default LastName