import React from 'react'
import { E_scratchpadTypes } from './scratchpadTypes'
import './scratchpadPopup.scss'
import { SpPopoutAtisIcon, SpPopoutCraftIcon, SpPopoutDrawIcon, SpPopoutHoldIcon } from './ScratchpadIcons'

type T_ScratchpadPopupProps = {
  clickHandler: (addType: E_scratchpadTypes) => void
}

export const ScratchpadPopup: React.FC<T_ScratchpadPopupProps> = (props: T_ScratchpadPopupProps): JSX.Element => {
  return (
    <div className="popupContainer">
      <div className="popup-flex-row">
        <div
          onClick={() => {
            props.clickHandler(E_scratchpadTypes.DRAW)
          }}
          className="popup-content"
        >
          <SpPopoutDrawIcon width={100} />
          {E_scratchpadTypes.DRAW}
        </div>
        <div
          onClick={() => {
            props.clickHandler(E_scratchpadTypes.CRAFT)
          }}
          className="popup-content"
        >
          <SpPopoutCraftIcon width={100} />
          {E_scratchpadTypes.CRAFT}
        </div>
      </div>
      <div className="popup-flex-row">
        <div
          onClick={() => {
            props.clickHandler(E_scratchpadTypes.ATIS)
          }}
          className="popup-content"
        >
          <SpPopoutAtisIcon width={100} />
          {E_scratchpadTypes.ATIS}
        </div>
        <div
          onClick={() => {
            props.clickHandler(E_scratchpadTypes.HOLDING)
          }}
          className="popup-content"
        >
          <SpPopoutHoldIcon width={100} />
          {E_scratchpadTypes.HOLDING}
        </div>
      </div>
    </div>
  )
}
