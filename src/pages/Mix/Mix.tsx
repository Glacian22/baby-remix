import React, { useState } from "react"
import { firstNamesAtom, lastNamesAtom } from "../../lib/atom"
import { useAtom } from 'jotai'


const Mix = () => {

  const [firstNames] = useAtom(firstNamesAtom)
  const [lastNames] = useAtom(lastNamesAtom)

  const [currentName, setCurrentName] = useState('')
  const [namesList, setNamesList] = useState<string[]>([])

  let numMiddle = 1
  let showLast = true

  const mixName = () => {
    let firstShuffled = shuffle(firstNames)
    let tempName = ''

    //get first occurance of a name with type: 'first' or 'either'
    const firstIndex = firstShuffled.findIndex((nameObj) => (nameObj.type === 'first' || nameObj.type === 'either'))
    tempName = firstShuffled[firstIndex].name

    //remove that name from the shuffled array so we don't repeat it for a middle name
    firstShuffled = [...firstShuffled.slice(0, firstIndex), ...firstShuffled.slice(firstIndex + 1, firstShuffled.length)]

    //get a middle name
    const middleIndex = firstShuffled.findIndex((nameObj) => (nameObj.type === 'middle' || nameObj.type === 'either'))
    tempName += " " + firstShuffled[middleIndex].name

    if (showLast) {
      tempName += " " + lastNames[0]
    }

    setCurrentName(tempName)

    // add name to list, unless it already exists
    if (namesList.indexOf(tempName) === -1) {
      setNamesList([...namesList, tempName])
    }
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