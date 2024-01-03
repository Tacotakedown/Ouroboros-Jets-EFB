import React from 'react'
import { type T_ChecklistContent } from '../../ChecklistContent/ChecklistContent'
import './ChecklistContentDisplay.scss'
import { ChecklistItemDisplay } from '../ChecklistItemDisplay/ChecklistItemDisplay'

type T_ChecklistContentDisplayProps = {
  checklist: T_ChecklistContent[]
  currentChecklist: number
  handleComplete: (index: number) => void
}

export const ChecklistContentDisplay: React.FC<T_ChecklistContentDisplayProps> = (
  props: T_ChecklistContentDisplayProps
): JSX.Element => {
  const currentChecklist: T_ChecklistContent = props.checklist[props.currentChecklist]

  const getChecklistItem = (): JSX.Element[] => {
    const checklistItems: JSX.Element[] = []
    for (let i = 0; i < currentChecklist.Challenge.length; i++) {
      const challenge: string = currentChecklist.Challenge[i].content
      const action: string = currentChecklist.action[i]
      const performedBy: string = currentChecklist.performedBy[i]

      if (currentChecklist.Challenge[i].isCaution) {
        checklistItems.push(
          <ChecklistItemDisplay
            key={i}
            Challenge={challenge}
            action={action}
            performedBy={performedBy}
            handleComplete={() => {}}
            isCaution={true}
          />
        )
      } else if (currentChecklist.Challenge[i].isNote) {
        checklistItems.push(
          <ChecklistItemDisplay
            key={i}
            Challenge={challenge}
            action={action}
            performedBy={performedBy}
            handleComplete={() => {}}
            isNote={true}
          />
        )
      } else if (currentChecklist.Challenge[i].isDivider) {
        checklistItems.push(
          <ChecklistItemDisplay
            key={i}
            Challenge={challenge}
            action={action}
            performedBy={performedBy}
            handleComplete={() => {}}
            isDivider={true}
          />
        )
      } else {
        checklistItems.push(
          <ChecklistItemDisplay
            key={i}
            Challenge={challenge}
            action={action}
            performedBy={performedBy}
            handleComplete={() => {}}
          />
        )
      }
    }
    return checklistItems
  }

  return (
    <div className="checklist-content-display-container">
      <div className="checklist-content-header">
        <div>Challenge</div>
        <div>Action</div>
        <div>Performed By</div>
      </div>
      {getChecklistItem()}
    </div>
  )
}
