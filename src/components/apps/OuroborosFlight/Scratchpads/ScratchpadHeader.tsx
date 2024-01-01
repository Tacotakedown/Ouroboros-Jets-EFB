import React from 'react'
import './Scratchpads.scss'

type T_ScratchpadHeaderProps = {
  AddClicked: (event: any) => void
  EditClicked: () => void
  DoneClicked: () => void
  DeleteAllClick: () => void
  isEditMode: boolean
  addAvailable: boolean
}

export const ScratchpadHeader: React.FC<T_ScratchpadHeaderProps> = (props: T_ScratchpadHeaderProps): JSX.Element => {
  return (
    <div className="scratchpad-header">
      {!props.isEditMode ? (
        <div className="sp-header-edit" onClick={props.EditClicked}>
          Edit
        </div>
      ) : (
        <div className="sp-header-done" onClick={props.DoneClicked}>
          Done
        </div>
      )}
      {!props.isEditMode ? (
        props.addAvailable ? (
          <div className="sp-header-add" onClick={props.AddClicked}>
            +
          </div>
        ) : (
          ''
        )
      ) : (
        <div className="sp-header-delete" onClick={props.DeleteAllClick}>
          Delete All
        </div>
      )}
    </div>
  )
}
