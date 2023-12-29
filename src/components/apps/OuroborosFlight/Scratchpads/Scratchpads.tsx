import React from 'react'
import './Scratchpads.scss'
import { ScratchpadHeader } from './ScratchpadHeader'
import { ScratchpadPopup } from './ScratchPadPopup'
import { E_scratchpadTypes } from './scratchpadTypes'
import { AppContext } from '../../appRouter/appRouter'

export type T_Scratchpad = {
  type: E_scratchpadTypes
  content: string
}

export const Scratchpads = () => {
  const { state, updateState } = React.useContext(AppContext)
  const [editMode, setEditMode] = React.useState<boolean>(false)
  const [addMenu, setAddMenu] = React.useState<boolean>(false)
  const [showScratchpad, setShowScratchpad] = React.useState<boolean>(false)
  const [confirmDeleteAll, setConfirmDeleteAll] = React.useState<boolean>(false)
  const [popupPosition, setPopupPosition] = React.useState({ x: 0, y: 0 })
  const [activeScratchpad, setActiveScratchpad] = React.useState<T_Scratchpad | null>(null)

  const scratchpads: T_Scratchpad[] = state?.ouroborosFlight.scratchpads ?? []
  const setScratchpads = (scratchpads: T_Scratchpad[]): void => {
    updateState({
      ...state,
      state: {
        ouroborosFlight: {
          page: state?.ouroborosFlight.page,
          currentChart: state?.ouroborosFlight.currentChart,
          currentAirport: state?.ouroborosFlight.currentAirport,
          favorites: state?.ouroborosFlight.favorites,
          darkMode: state?.ouroborosFlight.darkMode,
          scratchpads: scratchpads
        }
      }
    })
  }

  const useOutsidePopupAlerter = (ref: any, setTheState: (value: React.SetStateAction<boolean>) => void) => {
    React.useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setTheState(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }
  const popupRef = React.useRef(null)
  const confirmRef = React.useRef(null)
  useOutsidePopupAlerter(popupRef, setAddMenu)
  useOutsidePopupAlerter(confirmRef, setConfirmDeleteAll)

  const addScratchpadClick = (event: any): void => {
    const buttonRect = event.target.getBoundingClientRect()
    const buttonX = buttonRect.left
    const buttonY = buttonRect.bottom
    setPopupPosition({ x: buttonX, y: buttonY })
    setAddMenu(true)
  }
  const editScratchpadClick = (): void => {
    setEditMode(true)
  }
  const doneSpClicked = (): void => {
    setEditMode(false)
  }
  const deleteAllScratchpadClick = (): void => {
    setConfirmDeleteAll(true)
  }
  const confirmDeleteAllClick = (): void => {
    setScratchpads([])
    setEditMode(false)
    setConfirmDeleteAll(false)
  }
  const openScratchpad = (setInfo: T_Scratchpad): void => {
    setActiveScratchpad(setInfo)
    setShowScratchpad(true)
  }
  const closeScratchpad = (): void => {
    setActiveScratchpad(null)
    setShowScratchpad(false)
  }

  const addScratchpad = (type: E_scratchpadTypes): void => {
    const newScratchpad = { type: type, content: '' }
    setScratchpads([...scratchpads, newScratchpad])
  }
  const removeScratchpad = (index: number): void => {
    if (index >= 0 && index < scratchpads.length) {
      const updatedScratchpads = [...scratchpads]
      updatedScratchpads.splice(index, 1)
      setScratchpads(updatedScratchpads)
    }
  }
  const handlePopupClick = (addType: E_scratchpadTypes): void => {
    addScratchpad(addType)
    setAddMenu(false)
  }
  return (
    <div>
      <ScratchpadHeader
        DeleteAllClick={deleteAllScratchpadClick}
        AddClicked={addScratchpadClick}
        EditClicked={editScratchpadClick}
        isEditMode={editMode}
        DoneClicked={doneSpClicked}
      />
      <div className="sp-content-container">
        {scratchpads.length !== 0 ? (
          <div className="sp-content-container-inner">
            {scratchpads.map((s, index: number) => {
              return (
                <div
                  onClick={() => {
                    openScratchpad(s)
                  }}
                  className="sp-item-container"
                >
                  <div>{s.type}</div>
                  {editMode ? (
                    <div
                      onClick={() => {
                        removeScratchpad(index)
                      }}
                    >
                      {' '}
                      -{' '}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              )
            })}
            <div className="add-scratchpad-content-button" onClick={addScratchpadClick}>
              Add Scratchpad
            </div>
          </div>
        ) : (
          <div className="add-scratchpad-content-button" onClick={addScratchpadClick}>
            Add Scratchpad
          </div>
        )}
      </div>

      {confirmDeleteAll && (
        <div ref={confirmRef}>
          <div>Are you Sure you want to delete ALL scratchpads?</div>
          <div onClick={confirmDeleteAllClick}>yes</div>
        </div>
      )}
      {addMenu && (
        <div
          ref={popupRef}
          className="popup-container"
          style={{ top: `${popupPosition.y}px`, left: `${popupPosition.x}px` }}
        >
          <ScratchpadPopup clickHandler={handlePopupClick} />
        </div>
      )}
      {showScratchpad && (
        <div className="scratchpad-display-container">
          <div onClick={closeScratchpad}>close</div>
          <div>Scratchpad here of type {activeScratchpad?.type}</div>
        </div>
      )}
    </div>
  )
}
