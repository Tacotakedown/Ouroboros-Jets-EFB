import React from 'react'
import { type T_ChecklistContent } from '../../ChecklistContent/ChecklistContent'
import './ChecklistSelector.scss'
import { ChecklistSelectorButton } from '../ChecklistSelecorButton/ChecklistSelectorButton'

type T_ChecklistSelectorProps = {
  checklist: T_ChecklistContent[]
  onClick: (index: number) => void
  completedChecklists: boolean[]
  activeChecklist: number | null
  resetAllChecklists: () => void
}

export const ChecklistSelector: React.FC<T_ChecklistSelectorProps> = (props: T_ChecklistSelectorProps): JSX.Element => {
  const allTrue = (arr: boolean[]): boolean => {
    return arr.every((value) => value)
  }

  const isAllCompleted: boolean = allTrue(props.completedChecklists)
  return (
    <div className="checklist-selector">
      <div className="checklist-selector-title">Checklists</div>
      <div className="checklist-selector-button-bar">
        {props.checklist.map((item, index: number) => {
          if (index === 0 || index === 2 || index === 4 || index === 6 || index === 8) {
            return (
              <ChecklistSelectorButton
                activeChecklist={props.activeChecklist}
                onClick={props.onClick}
                key={index}
                text={item.name}
                to={index}
                completedChecklists={props.completedChecklists}
                dividerAbove
              />
            )
          } else {
            return (
              <ChecklistSelectorButton
                activeChecklist={props.activeChecklist}
                onClick={props.onClick}
                key={index}
                text={item.name}
                to={index}
                completedChecklists={props.completedChecklists}
              />
            )
          }
        })}
      </div>
      {isAllCompleted && (
        <div onClick={props.resetAllChecklists} className="reset-all-checklists-button">
          Reset All
        </div>
      )}
    </div>
  )
}
