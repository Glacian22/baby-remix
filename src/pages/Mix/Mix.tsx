import React, { useState } from "react"
import { firstNamesAtom, lastNamesAtom } from "../../lib/atom"
import { useAtom } from 'jotai'
import Modal from 'react-bootstrap/Modal'

const Mix = () => {

  const [firstNames] = useAtom(firstNamesAtom)
  const [lastNames] = useAtom(lastNamesAtom)

  const [currentName, setCurrentName] = useState('')
  const [namesList, setNamesList] = useState<string[]>([])

  let numMiddle = 3
  let showLast = true

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
      <span>Now let's mix up some baby names and see how they sound!</span>
      <div>
        <strong>
          {currentName}
        </strong>
      </div>
      <button onClick={mixName}>MIX</button>
      <button>settings</button>
      <div>{namesList.map((name) => <div>{name}</div>)}</div>
    </div>
  )
}

export default Mix