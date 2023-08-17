import React, { useState } from "react"
import { firstNamesAtom, lastNamesAtom } from "../../lib/atom"
import { useAtom } from 'jotai'


const Mix = () => {

  const [firstNames] = useAtom(firstNamesAtom)
  const [lastNames] = useAtom(lastNamesAtom)

  const [currentName, setCurrentName] = useState('')
  const [namesList, setNamesList] = useState<string[]>([])

  const mixName = () => {

  }

  return (
    <div>
      <span>Now let's mix up some baby names and see how they sound!</span>
      <div>
        <strong>
          {currentName}
        </strong>
      </div>
      <button>MIX</button>
      <button>settings</button>
      <div>{namesList.map(name => <div>{name}</div>)}</div>
      <div>{firstNames.map(x => <div>{x.name}</div>)}</div>
      <div>{lastNames}</div>
    </div>
  )
}

export default Mix