import React from 'react'
import './ChecklistSelectorButton.scss'

type T_ChecklistSelectorButtonProps = {
  text: string
  onClick: (index: number) => void
  to: number
  completed: boolean
  activeChecklist: number
}

export const ChecklistSelectorButton: React.FC<T_ChecklistSelectorButtonProps> = (
  props: T_ChecklistSelectorButtonProps
): JSX.Element => {
  return (
    <div
      className="checklist-selector-button"
      onClick={() => {
        props.activeChecklist !== props.to && props.onClick(props.to)
      }}
    >
      <div className={props.activeChecklist === props.to ? 'selector-button-active' : 'checklist-selector-button-text'}>
        {props.text}
      </div>
    </div>
  )
}
