import React from 'react'
import './CompleteChecklistButton.scss'

type T_CompleteChecklistButtonProps = {
  handleComplete: (index: number, set: boolean) => void
  checklistCompleted: boolean
  currentChecklist: number | null
}

export const CompleteChecklistButton: React.FC<T_CompleteChecklistButtonProps> = (
  props: T_CompleteChecklistButtonProps
): JSX.Element => {
  const className = props.checklistCompleted
    ? 'checklist-content-completeButton-complete'
    : 'checklist-content-completeButton-incomplete'
  return (
    <div style={{ position: 'relative' }}>
      {!props.checklistCompleted ? (
        <div
          className={className}
          onClick={() => {
            props.handleComplete(props.currentChecklist ?? 0, true)
          }}
        >
          Complete Checklist
        </div>
      ) : (
        <div
          className={className}
          onClick={() => {
            props.handleComplete(props.currentChecklist ?? 0, false)
          }}
        >
          Mark Incomplete
        </div>
      )}
    </div>
  )
}
