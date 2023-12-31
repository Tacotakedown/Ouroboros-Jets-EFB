import React, { useEffect, useRef, useState } from 'react'
import './Scratchpads.scss'
import { ScratchpadHeader } from './ScratchpadHeader'
import { ScratchpadPopup } from './ScratchpadPopup'
import { E_scratchpadTypes } from './scratchpadTypes'
import { AppContext } from '../../appRouter/appRouter'
import { CanvasPath, ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas'
import { RenderSvgFromString } from '../../../common/util/dangerousLoader'
import { SpBGCraft, SpPopoutIcon } from './ScratchpadIcons'
import { getBackground } from './ScratchpadBackground'
import { getSvg } from './getSvg'
import { Color, ColorResult, SketchPicker } from 'react-color'

export type T_Scratchpad = {
  type: E_scratchpadTypes
  content: CanvasPath[]
  preview: string
}
export type T_ScratchpadPenSettings = {
  size: number
  color: string
}

export const Scratchpads = () => {
  const { state, updateState } = React.useContext(AppContext)
  const [editMode, setEditMode] = React.useState<boolean>(false)
  const [addMenu, setAddMenu] = React.useState<boolean>(false)
  const [showScratchpad, setShowScratchpad] = React.useState<boolean>(false)
  const [confirmDeleteAll, setConfirmDeleteAll] = React.useState<boolean>(false)
  const [popupPosition, setPopupPosition] = React.useState({ x: 0, y: 0 })
  const [activeScratchpad, setActiveScratchpad] = React.useState<T_Scratchpad | null>(null)
  const [activeSpNumber, setActiveSpNumber] = React.useState<number>(0)
  const [penSettings, setPenSettings] = React.useState<T_ScratchpadPenSettings>({ color: 'white', size: 5 })

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
          scratchpads: scratchpads,
          scratchpadSvg: state?.ouroborosFlight.scratchpadSvg
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

  ///////////////// Fuctions for dealing with content array
  const updateContentAndPreview = (index: number, content: CanvasPath[], svg: string): void => {
    if (index >= 0 && index < scratchpads.length) {
      const updatedArray = [...scratchpads]
      updatedArray[index] = { type: updatedArray[index].type, content: content, preview: svg }
      setScratchpads(updatedArray)
    }
  }
  const addScratchpad = (type: E_scratchpadTypes): void => {
    const newScratchpad = { type: type, content: [], preview: '' }
    setScratchpads([...scratchpads, newScratchpad])
  }
  const removeScratchpad = (index: number): void => {
    if (index >= 0 && index < scratchpads.length) {
      const updatedScratchpads = [...scratchpads]
      updatedScratchpads.splice(index, 1)
      setScratchpads(updatedScratchpads)
    }
  }
  ///////////////////////////////////////////////////////////////////////////////

  //////// Refs for canvas and tracking need to unrender when clicked off component
  const canvasRef: React.RefObject<ReactSketchCanvasRef> = useRef<ReactSketchCanvasRef>(null)
  const popupRef = React.useRef(null)
  const confirmRef = React.useRef(null)

  useOutsidePopupAlerter(popupRef, setAddMenu)
  useOutsidePopupAlerter(confirmRef, setConfirmDeleteAll)
  //////////////////////////////////////

  /////////////////// Button onClick defs ////////////////////////
  const addScratchpadClick = (event: any): void => {
    if (addMenu == false) {
      const buttonRect = event.target.getBoundingClientRect()
      const buttonX = buttonRect.left
      const buttonY = buttonRect.bottom
      setPopupPosition({ x: buttonX, y: buttonY })
      setAddMenu(true)
    }
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
  const openScratchpad = (setInfo: T_Scratchpad, index: number): void => {
    setActiveScratchpad(setInfo)
    setActiveSpNumber(index)
    setShowScratchpad(true)
  }

  const handlePopupClick = (addType: E_scratchpadTypes): void => {
    addScratchpad(addType)
    setAddMenu(false)
  }

  const closeScratchpad = (): void => {
    if (canvasRef.current !== null && canvasRef.current !== undefined) {
      canvasRef.current.exportPaths().then((paths) => {
        if (paths !== undefined) {
          getSvg(canvasRef)
            .then((svg) => {
              if (svg !== undefined) {
                updateContentAndPreview(activeSpNumber, paths, svg)
              }
            })
            .catch((error) => {
              console.error(error)
            })
        }
      })
    }

    setActiveScratchpad(null)
    setShowScratchpad(false)
    setActiveSpNumber(0)
  }
  /////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////// Functions for dealing with pen color and size ///////////////////

  // const onPenColorChange = (color) => {
  //   setPenSettings({ size: penSettings.size, color: color })
  // }

  ///////////////////////// useEffect to load paths for selected scratchpad on load //////////////////
  React.useEffect(() => {
    if (showScratchpad) {
      canvasRef.current?.loadPaths(state?.ouroborosFlight?.scratchpads?.[activeSpNumber]?.content ?? [])
    }
  }, [showScratchpad, activeSpNumber, state])

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
                    editMode ? null : openScratchpad(s, index)
                  }}
                  className="sp-item-container"
                >
                  <div>{s.type}</div>
                  <div className="mini-preset-positioner">{getBackground(s.type)}</div>
                  <div className="mini-content-positioner">
                    <RenderSvgFromString element={state?.ouroborosFlight.scratchpads?.[index].preview ?? ''} />
                  </div>
                  {editMode ? (
                    <div
                      className="remove-button"
                      onClick={() => {
                        removeScratchpad(index)
                      }}
                    >
                      -
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
          <SpPopoutIcon ref={popupRef} className="popout-svg" width={300} />
          <ScratchpadPopup clickHandler={handlePopupClick} />
        </div>
      )}
      {showScratchpad && (
        <div className="scratchpad-display-container">
          <div className="scratchpad-display-header">
            <div
              className="clear-sp-button"
              onClick={() => {
                canvasRef.current?.clearCanvas()
              }}
            >
              Clear
            </div>
            <div className="close-sp-button" onClick={closeScratchpad}>
              close
            </div>
          </div>

          <div className="canvas-container">
            {/* <div>
              <SketchPicker color={penSettings.color} onChangeComplete={onPenColorChange} />
            </div> */}
            <div className="bg-positioner">
              <SpBGCraft width={1800} />
            </div>
            <div className="canvas-positioner">
              <ReactSketchCanvas
                canvasColor="transparent"
                style={{ border: 'none' }}
                ref={canvasRef}
                strokeWidth={penSettings.size}
                strokeColor={penSettings.color}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
