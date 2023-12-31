import React, { useRef, useState } from 'react'
import './Scratchpads.scss'
import { ScratchpadHeader } from './ScratchpadHeader'
import { ScratchpadPopup } from './ScratchpadPopup'
import { E_scratchpadTypes } from './scratchpadTypes'
import { AppContext } from '../../appRouter/appRouter'
import { CanvasPath, ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas'
import DOMPurify from 'dompurify'
import { SpBGCraft, SpPopoutIcon } from './ScratchpadIcons'

export type T_Scratchpad = {
  type: E_scratchpadTypes
  content: CanvasPath[]
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

  type T_RenderSvgFromStringProps = {
    element: string
  }
  const RenderSvgFromString: React.FC<T_RenderSvgFromStringProps> = (
    props: T_RenderSvgFromStringProps
  ): JSX.Element => {
    const sanitizedString = DOMPurify.sanitize(props.element)
    return <div dangerouslySetInnerHTML={{ __html: sanitizedString }} />
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
  const canvasRef: React.RefObject<ReactSketchCanvasRef> = useRef<ReactSketchCanvasRef>(null)
  const popupRef = React.useRef(null)
  const confirmRef = React.useRef(null)

  useOutsidePopupAlerter(popupRef, setAddMenu)
  useOutsidePopupAlerter(confirmRef, setConfirmDeleteAll)

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
  React.useEffect(() => {
    if (showScratchpad) {
      canvasRef.current?.loadPaths(state?.ouroborosFlight?.scratchpads?.[activeSpNumber]?.content ?? [])
    }
  }, [showScratchpad, activeSpNumber, state])

  const [svgArray, setSvgArray] = useState<string[]>([]) // THIS CANNOT BE STORED IN THIS COMPONENT, IT NEEDS THE SAME HEIARCY OF THE SCRATCHPAD CONTENT STATE IN THE USECONTEXT OR ELSE THERE WILL BE A MISMATCH IN ARRAY LENGTH WHEN RE REDNDERING THIS COMPONENT (IT WILL NOT NOT NOT NOT NOT NOT NOT NOT WORK) still too lazy to fix rn

  const svgArrayPush = (input: string): void => {
    const newArray = [...svgArray, input]
    setSvgArray(newArray)
  }
  const svgArrayReplaceByIndex = (indexToReplace: number, replacement: string): void => {
    if (indexToReplace >= 0 && indexToReplace < svgArray.length) {
      const newArray = [...svgArray]
      newArray[indexToReplace] = replacement
      setSvgArray(newArray)
    }
  }
  const svgArrayRemoveByIndex = (indexToRemove: number): void => {
    if (indexToRemove >= 0 && indexToRemove < svgArray.length) {
      const newArray = [...svgArray.slice(0, indexToRemove), ...svgArray.slice(indexToRemove + 1)]
      setSvgArray(newArray)
    }
  }

  const getSvg = async (): Promise<string | undefined> => {
    try {
      if (canvasRef.current) {
        const svg = await canvasRef.current.exportSvg()
        return svg
      }
    } catch (e) {
      console.error(e)
    }

    return undefined
  }
  // we can export the svg and pair it with a key in an object then use it to display a preview

  const closeScratchpad = (): void => {
    if (canvasRef.current !== null && canvasRef.current !== undefined) {
      canvasRef.current.exportPaths().then((paths) => {
        if (paths !== undefined) {
          updateContent(activeSpNumber, paths)
        }
      })

      getSvg()
        .then((svg) => {
          if (svg !== undefined) {
            svgArrayReplaceByIndex(activeSpNumber, svg)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }

    setActiveScratchpad(null)
    setShowScratchpad(false)
    setActiveSpNumber(0)
  }

  const updateContent = (index: number, content: CanvasPath[]): void => {
    if (index >= 0 && index < scratchpads.length) {
      const updatedArray = [...scratchpads]
      updatedArray[index] = { type: updatedArray[index].type, content: content }
      setScratchpads(updatedArray)
    }
  }

  const addScratchpad = (type: E_scratchpadTypes): void => {
    const newScratchpad = { type: type, content: [] }
    setScratchpads([...scratchpads, newScratchpad])
    svgArrayPush('')
  }
  const removeScratchpad = (index: number): void => {
    if (index >= 0 && index < scratchpads.length) {
      svgArrayRemoveByIndex(index)
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
                    editMode ? null : openScratchpad(s, index)
                  }}
                  className="sp-item-container"
                >
                  <div>{s.type}</div>
                  <div className="mini-preset-positioner">
                    <SpBGCraft width={300} />
                  </div>
                  <div className="mini-content-positioner">
                    <RenderSvgFromString element={svgArray[index]} />
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
            <div className="bg-positioner">
              <SpBGCraft width={1800} />
            </div>
            <div className="canvas-positioner">
              <ReactSketchCanvas
                exportWithBackgroundImage
                canvasColor="transparent"
                style={{ border: 'none' }}
                ref={canvasRef}
                strokeWidth={5}
                strokeColor="white"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
