import React from 'react'
import './ChecklistContentHeader.scss'

type T_ChecklistContentHeaderProps = {
  field1: string
  field2: string
  field3: string
}

export const ChecklistContentHeader: React.FC<T_ChecklistContentHeaderProps> = (
  props: T_ChecklistContentHeaderProps
): JSX.Element => {
  return (
    <div className="checklist-content-header">
      <div>{props.field1}</div>
      <div className="cl-content-header-sep"></div>
      <div>{props.field2}</div>
      <div className="cl-content-header-sep"></div>
      <div>{props.field3}</div>
    </div>
  )
}
