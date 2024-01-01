import React from 'react'
import { E_scratchpadTypes } from './scratchpadTypes'
import { SpBGCraft, SpBgAtis } from './ScratchpadIcons'

export const getBackground = (type: E_scratchpadTypes, width: number): JSX.Element => {
  switch (type) {
    case E_scratchpadTypes.DRAW:
      return <></>
    case E_scratchpadTypes.CRAFT:
      return <SpBGCraft width={width} />
    case E_scratchpadTypes.ATIS:
      return <SpBgAtis width={width} />
    case E_scratchpadTypes.HOLDING:
    default:
      return <></>
  }
}
