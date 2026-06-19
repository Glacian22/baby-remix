import { useState } from "react"
import Button from '../../components/Button'
import NameRow from '../../components/NameRow'
import ConfettiBurst from '../../components/ConfettiBurst'
import { motion } from 'framer-motion'
import { variants, itemVariants } from '../../lib/anims'
import { firstNamesAtom, lastNamesAtom, mixedNamesAtom, favoritesAtom, IName } from "../../lib/atom"
import { useAtom } from 'jotai'
import { getInitials, isUnfortunateMonogram } from '../../lib/names'
import { downloadTextFile } from '../../lib/io'
import Settings from "./Settings"
import '../firstLastName.scoped.css'

// TODO: guard against no names entered
const Mix = () => {

  const [firstNames] = useAtom(firstNamesAtom)
  const [lastNames] = useAtom(lastNamesAtom)
  const [mixedNames, setMixedNames] = useAtom(mixedNamesAtom)
  const [favorites, setFavorites] = useAtom(favoritesAtom)
  const [currentName, setCurrentName] = useState('')
  const [burstKey, setBurstKey] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [numMiddle, setNumMiddle] = useState(1)
  const [showLast, setShowLast] = useState(true)

  const toggleModal = () => setShowModal(!showModal)

  const toggleLast = () => setShowLast(!showLast)

  const toggleFavorite = (name: string) => {
    setFavorites(favorites.includes(name) ? favorites.filter((n) => n !== name) : [...favorites, name])
  }

  const exportMixes = () => {
    if (mixedNames.length === 0) return
    downloadTextFile('baby-name-mixes.txt', mixedNames.join('\n'))
  }

  const mixName = () => {
    let firstShuffled = shuffle(firstNames)
    let tempName = ''

    //get first occurance of a name with type: 'first' or 'either'
    const firstIndex = getNameIndex(firstShuffled, 'first')
    if (firstIndex === -1) {
      setCurrentName('Add at least one first name to get started!')
      return
    }
    tempName = firstShuffled[firstIndex].name
    firstShuffled = removeItem(firstShuffled, firstIndex)

    //get some middle names (stop early if we run out)
    for (let i = 0; i < numMiddle; i++) {
      const middleIndex = getNameIndex(firstShuffled, 'middle')
      if (middleIndex === -1) break
      tempName += " " + firstShuffled[middleIndex].name
      firstShuffled = removeItem(firstShuffled, middleIndex)
    }

    if (showLast && lastNames.length > 0) {
      tempName += " " + lastNames[0]
    }

    setCurrentName(tempName)
    setBurstKey((k) => k + 1) // replay the sparkle burst on each successful mix

    // add name to list, unless it already exists
    if (mixedNames.indexOf(tempName) === -1) {
      setMixedNames([...mixedNames, tempName])
    }
  }

  const getNameIndex = (arr: IName[], type: 'first' | 'middle') => {
    return arr.findIndex((nameObj) => (nameObj.type === type || nameObj.type === 'either'))
  }

  const removeItem = (arr: IName[], index: number) => {
    return [...arr.slice(0, index), ...arr.slice(index + 1, arr.length)]
  }

  // Fisher–Yates shuffle on a copy (never mutate the source atom array)
  const shuffle = (arr: IName[]): IName[] => {
    const copy = [...arr]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
  }

  const maxMiddle = () => {
    return firstNames.filter(x => x.type === 'middle' || x.type === 'either').length
  }

  const mapMixedNames = () => {
    const reversed = [...mixedNames].reverse()
    return reversed.map((name) =>
      <NameRow
        key={name}
        name={name}
        isFavorite={favorites.includes(name)}
        onToggleFavorite={toggleFavorite}
      />
    )
  }

  return (
    <motion.div className='mix-page' variants={variants} animate='enter' exit='exit' initial='initial'>
      <motion.div variants={itemVariants} key='next-btn' id='back'>
        <Button to={'lastname'} variant='square'>Back</Button>
      </motion.div>
      <motion.div variants={itemVariants} key='mixText'>Now let's mix up some baby names and see how they sound!</motion.div>
      <motion.div className='current-name' variants={itemVariants} key='currentName'>
        <span className='current-name-wrap'>
          <strong>
            {currentName}
          </strong>
          {burstKey > 0 && <ConfettiBurst key={burstKey} />}
        </span>
        {currentName && isUnfortunateMonogram(currentName) &&
          <div className='monogram-note'>⚠ initials spell "{getInitials(currentName)}"</div>
        }
      </motion.div>
      <motion.div variants={itemVariants} key='mix+settings'>
        <Button variant='square' nav={false} onClick={mixName}>MIX</Button>
        <Button variant='square' nav={false} onClick={toggleModal}>settings</Button>
        <Button variant='square' nav={false} onClick={exportMixes}>export</Button>
      </motion.div>
      <motion.div className='names' variants={itemVariants}>
        {mapMixedNames()}
      </motion.div>
      <Settings show={showModal} toggleModal={toggleModal} middle={numMiddle} setMiddle={setNumMiddle} showLast={showLast} toggleLast={toggleLast} maxMiddle={maxMiddle()} />
    </motion.div>
  )
}

export default Mix