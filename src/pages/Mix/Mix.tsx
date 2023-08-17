import React, { useState } from "react"


const Mix = () => {

  const [currentName, setCurrentName] = useState('')
  const [namesList, setNamesList] = useState<string[]>([])

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
    </div>
  )
}

export default Mix