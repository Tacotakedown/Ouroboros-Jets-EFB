import React from 'react'
import './Scratchpads.scss'

type T_ScratchpadHeaderProps = {
  AddClicked: () => void
  EditClicked: () => void
  DoneClicked: () => void
  DeleteAllClick: () => void
  isEditMode: boolean
}

export const ScratchpadHeader: React.FC<T_ScratchpadHeaderProps> = (props: T_ScratchpadHeaderProps): JSX.Element => {
  return (
    <div className="scratchpad-header">
      {!props.isEditMode ? <div onClick={props.EditClicked}>Edit</div> : <div onClick={props.DoneClicked}>Done</div>}
      {!props.isEditMode ? (
        <div onClick={props.AddClicked}>+</div>
      ) : (
        <div onClick={props.DeleteAllClick}>Delete All</div>
      )}
    </div>
  )
}
