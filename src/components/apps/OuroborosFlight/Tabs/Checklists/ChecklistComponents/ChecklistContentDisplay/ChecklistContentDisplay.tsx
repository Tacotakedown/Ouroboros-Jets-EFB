import React from 'react'
import { type T_ChecklistContent } from '../../ChecklistContent/ChecklistContent'
import './ChecklistContentDisplay.scss'
import { ChecklistItemDisplay } from '../ChecklistItemDisplay/ChecklistItemDisplay'

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
        <div className="cl-content-header-sep"></div>
        <div>Action</div>
        <div className="cl-content-header-sep"></div>
        <div>Performed By</div>
      </div>
      {getChecklistItem()}
      <div style={{ position: 'relative' }}>
        {!checklistCompleted ? (
          <div
            className="checklist-content-completeButton"
            onClick={() => {
              props.handleComplete(props.currentChecklist ?? 0, true)
            }}
          >
            Complete Checklist
          </div>
        ) : (
          <div
            className="checklist-content-completeButton"
            onClick={() => {
              props.handleComplete(props.currentChecklist ?? 0, false)
            }}
          >
            Mark Incomplete
          </div>
        )}
      </div>
    </div>
  )
}
