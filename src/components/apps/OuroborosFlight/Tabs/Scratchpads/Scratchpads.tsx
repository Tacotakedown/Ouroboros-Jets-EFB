// TODO: Slider component for pen size, hook it up to commented functions and position in the styled box

import React, { useRef } from 'react'
import './Scratchpads.scss'
import { ScratchpadHeader } from './ScratchpadHeader'
import { ScratchpadPopup } from './ScratchpadPopup'
import { type E_scratchpadTypes } from './scratchpadTypes'
import { AppContext } from '../../../appRouter/appRouter'
import { type CanvasPath, type ReactSketchCanvasRef, ReactSketchCanvas } from 'react-sketch-canvas'
import { RenderSvgFromString } from '../../../../common/util/dangerousLoader'
import { SpAddIcon, SpPopoutIcon } from './ScratchpadIcons'
import { getBackground } from './ScratchpadBackground'
import { getSvg } from './getSvg'
import { type ColorResult, GithubPicker } from 'react-color'

export type T_Scratchpad = {
  type: E_scratchpadTypes
  content: CanvasPath[]
  preview: string
  timestamp: number
}
export type T_ScratchpadPenSettings = {
  size: number
  color: string
}

export const Scratchpads = (): JSX.Element => {
  const { state, updateState } = React.useContext(AppContext)
  const [editMode, setEditMode] = React.useState<boolean>(false)
  const [addMenu, setAddMenu] = React.useState<boolean>(false)
  const [showScratchpad, setShowScratchpad] = React.useState<boolean>(false)
  const [confirmDeleteAll, setConfirmDeleteAll] = React.useState<boolean>(false)
  const [popupPosition, setPopupPosition] = React.useState({ x: 0, y: 0 })
  const [activeScratchpad, setActiveScratchpad] = React.useState<T_Scratchpad | null>(null)
  const [activeSpNumber, setActiveSpNumber] = React.useState<number>(0)
  const [penSettings, setPenSettings] = React.useState<T_ScratchpadPenSettings>({ color: 'white', size: 5 })
  const [penColorMenu, setPenColorMenu] = React.useState<boolean>(false)
  const [penSizeMenu, setPenSizeMenu] = React.useState<boolean>(false)
  const [addHovered, setAddHovered] = React.useState<boolean>(false)

  const maxScratchpads: number = 15

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
        },
        checklists: {
          currentChecklist: state?.checklists.currentChecklist,
          completedChecklists: state?.checklists.completedChecklists
        }
      }
    })
  }

  const useOutsidePopupAlerter = <T extends HTMLElement>(
    ref: React.RefObject<T>,
    setTheState: (value: React.SetStateAction<boolean>) => void
  ): void => {
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent): void => {
        if (ref.current !== null && !ref.current.contains(event.target as Node)) {
          setTheState(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  // Fuctions for dealing with content array //
  const updateContentAndPreview = (index: number, content: CanvasPath[], svg: string): void => {
    if (index >= 0 && index < scratchpads.length) {
      const updatedArray = [...scratchpads]
      updatedArray[index] = {
        type: updatedArray[index].type,
        content: content,
        preview: svg,
        timestamp: updatedArray[index].timestamp
      }
      setScratchpads(updatedArray)
    }
  }
  const addScratchpad = (type: E_scratchpadTypes): void => {
    const date = Date.now()
    const newScratchpad = { type: type, content: [], preview: '', timestamp: date }
    setScratchpads([...scratchpads, newScratchpad])
  }
  const removeScratchpad = (index: number): void => {
    if (index >= 0 && index < scratchpads.length) {
      const updatedScratchpads = [...scratchpads]
      updatedScratchpads.splice(index, 1)
      setScratchpads(updatedScratchpads)
    }
  }

  // Refs for canvas and tracking need to unrender when clicked off component
  const canvasRef: React.RefObject<ReactSketchCanvasRef> = useRef<ReactSketchCanvasRef>(null)
  const popupRef = React.useRef(null)
  const confirmRef = React.useRef(null)
  const colorPickerRef = React.useRef(null)
  const penSizeRef = React.useRef(null)

  useOutsidePopupAlerter(popupRef, setAddMenu)
  useOutsidePopupAlerter(confirmRef, setConfirmDeleteAll)
  useOutsidePopupAlerter(colorPickerRef, setPenColorMenu)
  useOutsidePopupAlerter(penSizeRef, setPenSizeMenu)

  const maxNumber = (limit: number, value: number): number => {
    return value > limit ? limit : value
  }
  // Button onClick defs //
  const addScratchpadClick = (event: any): void => {
    if (!addMenu) {
      const buttonRect: DOMRect = event.target.getBoundingClientRect()
      const buttonX: number = buttonRect.left
      const buttonY: number = buttonRect.bottom
      const buttonW: number = buttonRect.width
      // const buttonH:number = buttonRect.height
      const hWidth: number = 0.5 * buttonW
      const limitX: number = maxNumber(1860, buttonX + hWidth)
      const limitY: number = maxNumber(1200, buttonY)
      setPopupPosition({ x: limitX, y: limitY })
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
    setActiveSpNumber(index)
    setShowScratchpad(true)
    setActiveScratchpad(setInfo)
  }

  const handlePopupClick = (addType: E_scratchpadTypes): void => {
    addScratchpad(addType)
    setAddMenu(false)
  }

  const closeScratchpad = (): void => {
    if (canvasRef.current !== null && canvasRef.current !== undefined) {
      canvasRef.current
        .exportPaths()
        .then((paths) => {
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
        .catch((e) => {
          console.error(e)
        })
    }
    setShowScratchpad(false)
    setActiveScratchpad(null)
    setActiveSpNumber(0)
  }

  // Functions for dealing with pen color and size //

  const onPenColorChange = (color: ColorResult): void => {
    setPenSettings({ size: penSettings.size, color: color.hex })
  }

  // const onPenSizeChange = (value: number): void => {
  //   setPenSettings({ size: value, color: penSettings.color })
  // }
  // useEffect to load paths for selected scratchpad on load //
  React.useEffect(() => {
    if (showScratchpad) {
      canvasRef.current?.loadPaths(state?.ouroborosFlight?.scratchpads?.[activeSpNumber]?.content ?? [])
    }
  }, [showScratchpad, activeSpNumber, state])

  type FormatOptions = {
    timeZone?: string
    year?: 'numeric' | '2-digit'
    month?: 'numeric' | '2-digit'
    day?: 'numeric' | '2-digit'
    hour?: 'numeric' | '2-digit'
    minute?: 'numeric' | '2-digit'
    hour12?: boolean
  }

  const getFormattedUTC = (timestamp: number, useToLocaleString: boolean = false, options?: FormatOptions): string => {
    const date = new Date(timestamp)

    if (isNaN(date.getTime())) return 'Invalid Timestamp'

    if (useToLocaleString) {
      const defaultOptions: FormatOptions = {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      }

      const mergedOptions = { ...defaultOptions, ...options }
      return date.toLocaleString('en-US', mergedOptions)
    } else {
      return date.toUTCString()
    }
  }

  const handleMouseEnterAdd = (): void => {
    setAddHovered(true)
  }
  const handleMouseLeaveAdd = (): void => {
    setAddHovered(false)
  }

  return (
    <div>
      <ScratchpadHeader
        DeleteAllClick={deleteAllScratchpadClick}
        AddClicked={addScratchpadClick}
        EditClicked={editScratchpadClick}
        isEditMode={editMode}
        DoneClicked={doneSpClicked}
        addAvailable={scratchpads.length < 15}
      />
      <div className="sp-content-container">
        {scratchpads.length !== 0 ? (
          <div className="sp-content-container-inner">
            {scratchpads.map((s, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    if (!editMode) {
                      openScratchpad(s, index)
                    }
                  }}
                  className="sp-item-container"
                >
                  <div>{getFormattedUTC(s.timestamp, true)}Z</div>
                  <div className="mini-preset-positioner">{getBackground(s.type, 300)}</div>
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
            {scratchpads.length < maxScratchpads ? (
              <div
                className="add-scratchpad-content-button"
                onClick={addScratchpadClick}
                onMouseEnter={handleMouseEnterAdd}
                onMouseLeave={handleMouseLeaveAdd}
              >
                <SpAddIcon
                  hovered={addHovered}
                  handleEnter={handleMouseEnterAdd}
                  handleLeave={handleMouseLeaveAdd}
                  width={180}
                />
                Add Scratchpad
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          <div
            className="add-scratchpad-content-button"
            onClick={addScratchpadClick}
            onMouseEnter={handleMouseEnterAdd}
            onMouseLeave={handleMouseLeaveAdd}
          >
            <SpAddIcon
              hovered={addHovered}
              handleEnter={handleMouseEnterAdd}
              handleLeave={handleMouseLeaveAdd}
              width={180}
            />
            Add Scratchpad
          </div>
        )}
      </div>

      {confirmDeleteAll && (
        <div className="delete-all-container" ref={confirmRef}>
          <div className="delete-all-text">Are you Sure you want to delete ALL scratchpads?</div>
          <div onClick={confirmDeleteAllClick}>yes</div>
        </div>
      )}
      {addMenu && (
        <div
          ref={popupRef}
          className="popup-container"
          style={{ top: `${popupPosition.y + 20}px`, left: `${popupPosition.x}px` }}
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
            <div className="tool-container">
              <div
                onClick={() => {
                  setPenColorMenu(!penColorMenu)
                }}
              >
                Color ↓
              </div>
              <div
                onClick={() => {
                  setPenSizeMenu(!penSizeMenu)
                }}
              >
                Size ↓
              </div>
            </div>

            <div className="close-sp-button" onClick={closeScratchpad}>
              close
            </div>
          </div>

          {penColorMenu && (
            <div ref={colorPickerRef} className="color-menu">
              <GithubPicker color={penSettings.color} onChangeComplete={onPenColorChange} />
            </div>
          )}
          {penColorMenu && (
            <div className="pen-size-menu" ref={penSizeRef}>
              Set Size
            </div>
          )}
          <div className="canvas-container">
            <div className="bg-positioner">
              {activeScratchpad !== null ? getBackground(activeScratchpad.type, 1800) : ''}
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
