import React from 'react'
import './Scratchpads.scss'
import { ScratchpadHeader } from './ScratchpadHeader'

export const Scratchpads = () => {
  const [editMode, setEditMode] = React.useState<boolean>(false)
  const [addMenu, setAddMenu] = React.useState<boolean>(false)
  const addScratchpadClick = (): void => {
    setAddMenu(true)
  }
  const editScratchpadClick = (): void => {
    setEditMode(true)
  }
  const doneSpClicked = (): void => {
    setEditMode(false)
  }
  const deleteAllScratchpadClick = (): void => {
    console.log('delete all')
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
      <div>Scratchpad Array renders here</div>
      <div>
        ScratchPad popup <div>close</div>
      </div>
      {addMenu && <div onClick={() => setAddMenu(false)}>add menu</div>}
    </div>
  )
}
