import React from 'react'
import { E_scratchpadTypes } from './scratchpadTypes'
import { SpBGCraft } from './ScratchpadIcons'

export const getBackground = (type: E_scratchpadTypes): JSX.Element => {
  switch (type) {
    case E_scratchpadTypes.DRAW:
      return <></>
    case E_scratchpadTypes.CRAFT:
      return <SpBGCraft width={300} />
    case E_scratchpadTypes.ATIS:
    case E_scratchpadTypes.HOLDING:
    default:
      return <></>
  }
}
