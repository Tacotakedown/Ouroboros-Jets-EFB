import React from 'react'
import { type T_ChecklistContent } from '../../ChecklistContent/ChecklistContent'
import './ChecklistSelector.scss'
import { ChecklistSelectorButton } from '../ChecklistSelecorButton/ChecklistSelectorButton'

type T_ChecklistSelectorProps = {
  checklist: T_ChecklistContent[]
  onClick: (index: number) => void
  completed: boolean
  activeChecklist: number
}

export const ChecklistSelector: React.FC<T_ChecklistSelectorProps> = (props: T_ChecklistSelectorProps): JSX.Element => {
  return (
    <div className="checklist-selector">
      {props.checklist.map((item, index: number) => {
        return (
          <ChecklistSelectorButton
            activeChecklist={props.activeChecklist}
            onClick={props.onClick}
            key={index}
            text={item.name}
            to={index}
            completed={props.completed}
          />
        )
      })}
    </div>
  )
}
