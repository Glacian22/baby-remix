import React, { useState } from "react"
import { Link } from "react-router-dom"
import { firstNamesAtom, lastNamesAtom } from "../../lib/atom"
import { useAtom } from 'jotai'
import Settings from "./Settings"

// TODO: guard against no names entered
const Mix = () => {

  const [firstNames] = useAtom(firstNamesAtom)
  const [lastNames] = useAtom(lastNamesAtom)

  const [currentName, setCurrentName] = useState('')
  const [namesList, setNamesList] = useState<string[]>([])
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
    if (namesList.indexOf(tempName) === -1) {
      setNamesList([...namesList, tempName])
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

  return (
    <div>
      <Link to='/lastname'>back</Link>
      <span>Now let's mix up some baby names and see how they sound!</span>
      <div>
        <strong>
          {currentName}
        </strong>
      </div>
      <button onClick={mixName}>MIX</button>
      <button onClick={toggleModal}>settings</button>
      <div>{namesList.map((name) => <div>{name}</div>)}</div>
      <Settings show={showModal} toggleModal={toggleModal} middle={numMiddle} setMiddle={setNumMiddle} showLast={showLast} toggleLast={toggleLast} />
    </div>
  )
}

export default Mix