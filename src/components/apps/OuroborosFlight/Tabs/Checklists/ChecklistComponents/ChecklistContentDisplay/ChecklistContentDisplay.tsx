import React from 'react'
import { type T_ChecklistContent } from '../../ChecklistContent/ChecklistContent'
import './ChecklistContentDisplay.scss'
import { ChecklistItemDisplay } from '../ChecklistItemDisplay/ChecklistItemDisplay'
import { ChecklistContentHeader } from '../ChecklistContentHeader/ChecklistContentHeader'
import { CompleteChecklistButton } from '../CompleteChecklistButton/CompleteChecklistButton'

type T_ChecklistContentDisplayProps = {
  checklist: T_ChecklistContent[]
  currentChecklist: number | null
  handleComplete: (index: number, set: boolean) => void
  completedChecklists: boolean[]
}

export const ChecklistContentDisplay: React.FC<T_ChecklistContentDisplayProps> = (
  props: T_ChecklistContentDisplayProps
): JSX.Element => {
  if (props.currentChecklist === null || props.currentChecklist === undefined) {
    return <div className="checklist-select-a-checklist">Select a Checklist</div>
  }
  const currentChecklist: T_ChecklistContent = props.checklist[props.currentChecklist]
  const checklistCompleted: boolean = props.completedChecklists[props.currentChecklist]

  const getChecklistItem = (): JSX.Element[] | JSX.Element => {
    const checklistItems: JSX.Element[] = []
    for (let i = 0; i < currentChecklist.Challenge.length; i++) {
      const challenge: string = currentChecklist.Challenge[i].content
      const action: string = currentChecklist.action[i]
      const performedBy: string = currentChecklist.performedBy[i]

      if (currentChecklist.Challenge[i].isCaution) {
        checklistItems.push(
          <ChecklistItemDisplay
            details={null}
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
            details={null}
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
            details={null}
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
            details={currentChecklist.Challenge[i].details}
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
      <ChecklistContentHeader
        field1="Challenge"
        field2="Action"
        field3={props.checklist[props.currentChecklist].isAnsweredBy ? 'Answered By' : 'Performed By'}
      />
      {getChecklistItem()}
      <CompleteChecklistButton
        handleComplete={props.handleComplete}
        checklistCompleted={checklistCompleted}
        currentChecklist={props.currentChecklist}
      />
    </div>
  )
}
