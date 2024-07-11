import { useState } from "react"
import Button from '../../components/Button'
import { motion } from 'framer-motion'
import { variants, itemVariants, listVariants } from '../../lib/anims'
import { firstNamesAtom, lastNamesAtom, mixedNamesAtom } from "../../lib/atom"
import { useAtom } from 'jotai'
import Settings from "./Settings"
import '../firstLastName.scoped.css'

// TODO: guard against no names entered
const Mix = () => {

  const [firstNames] = useAtom(firstNamesAtom)
  const [lastNames] = useAtom(lastNamesAtom)
  const [mixedNames, setMixedNames] = useAtom(mixedNamesAtom)
  const [currentName, setCurrentName] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [numMiddle, setNumMiddle] = useState(1)
  const [showLast, setShowLast] = useState(true)

  const toggleModal = () => setShowModal(!showModal)

  const toggleLast = () => setShowLast(!showLast)

  const mixName = () => {
    let firstShuffled = shuffle(firstNames)
    let tempName = ''

    //get first occurance of a name with type: 'first' or 'either'
    const firstIndex = getNameIndex(firstShuffled, 'first')
    tempName = firstShuffled[firstIndex].name
    firstShuffled = removeItem(firstShuffled, firstIndex)

    //get some middle names
    for (let i = 0; i < numMiddle; i++) {
      const middleIndex = firstShuffled.findIndex((nameObj) => (nameObj.type === 'middle' || nameObj.type === 'either'))
      tempName += " " + firstShuffled[middleIndex].name
      firstShuffled = removeItem(firstShuffled, middleIndex)
    }

    if (showLast) {
      tempName += " " + lastNames[0]
    }

    setCurrentName(tempName)

    // add name to list, unless it already exists
    if (mixedNames.indexOf(tempName) === -1) {
      setMixedNames([...mixedNames, tempName])
    }
  }

  const getNameIndex = (arr: Array<any>, type: 'first' | 'middle') => {
    return arr.findIndex((nameObj) => (nameObj.type === type || nameObj.type === 'either'))
  }

  const removeItem = (arr: Array<any>, index: number) => {
    return [...arr.slice(0, index), ...arr.slice(index + 1, arr.length)]
  }

  const shuffle = (arr: Array<any>) => {
    return arr.sort(() => Math.random() - 0.5);
  };

  const maxMiddle = () => {
    return firstNames.filter(x => x.type === 'middle' || x.type === 'either').length
  }

  const mapMixedNames = () => {
    const reversed = [...mixedNames].reverse()
    return reversed.map((name, i) => 
      <motion.div key={i} variants={listVariants}>{name}
      </motion.div>
    )
  }

  return (
    <motion.div className='mix-page' variants={variants} animate='enter' exit='exit' initial='initial'>
      <motion.div variants={itemVariants} key='next-btn' id='back'>
        <Button to={'lastname'} variant='square'>Back</Button>
      </motion.div>
      <motion.div variants={itemVariants} key='mixText'>Now let's mix up some baby names and see how they sound!</motion.div>
      <motion.div variants={itemVariants} key='currentName'>
        <strong>
          {currentName}
        </strong>
      </motion.div>
      <motion.div variants={itemVariants} key='mix+settings'>
        <Button variant='square' nav={false} onClick={mixName}>MIX</Button>
        <Button variant='square' nav={false} onClick={toggleModal}>settings</Button>
      </motion.div>
      <motion.div className='names' variants={itemVariants}>
        {mapMixedNames()}
      </motion.div>
      <Settings show={showModal} toggleModal={toggleModal} middle={numMiddle} setMiddle={setNumMiddle} showLast={showLast} toggleLast={toggleLast} maxMiddle={maxMiddle()} />
    </motion.div>
  )
}

export default Mix