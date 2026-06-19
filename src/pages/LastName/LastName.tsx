import { useState, ChangeEvent, FormEvent } from 'react'
import Button from '../../components/Button'
import { motion } from 'framer-motion'
import { lastNamesAtom } from '../../lib/atom'
import { variants, itemVariants, listVariants } from '../../lib/anims'
import { useAtom } from 'jotai'
import "../firstLastName.scoped.css"


const LastName = () => {
  const [names, setNames] = useAtom(lastNamesAtom)
  const [lName, setlName] = useState<string>('')

  const acceptHandler = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = lName.trim()
    if (trimmed.length === 0) {
      return
    }
    if (names.includes(trimmed)) {
      return
    }
    setNames([...names, trimmed]);
    setlName('')
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setlName(e.target.value)
  }

  const mapNames = () => {

    return names.map((n, i) => {
      return (
        <motion.div key={n} variants={listVariants}>
          <button onClick={() => setNames(names.filter((_, idx) => idx !== i))}><span>X</span></button>
          {n}
        </motion.div>
      )
    })
  }

  return (
    <motion.div className='add-name-page' variants={variants} animate='enter' exit='exit' initial='initial'>
      <motion.div variants={itemVariants} key='back-btn' id='back'>
        <Button to={'firstname'} variant='square'>Back</Button>
      </motion.div>
      <form onSubmit={acceptHandler}>
        <motion.div variants={itemVariants} key='lNameForm'>
          <span className='label'>last name</span>
          <input type='text' name='name' autoComplete='off' value={lName} onChange={inputHandler}></input>
        </motion.div>
        <motion.button type='submit' variants={itemVariants} key='lname-accept' className='add'>add that name!</motion.button>
      </form>
      <motion.div variants={itemVariants} key='lName' className='names'>{mapNames()}</motion.div>
      <motion.div variants={itemVariants} key='next-btn' id='next'>
        <Button to={'mix'} variant='square'>Next</Button>
      </motion.div>
    </motion.div>
  )
}

export default LastName