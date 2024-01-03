import React from 'react'
import { ChecklistHeader } from './ChecklistComponents/ChecklistHeader/ChecklistHeader'
import './Checklists.scss'
import { ChecklistSelector } from './ChecklistComponents/ChecklistSelector/ChecklistSelector'
import { checklistContent } from './ChecklistContent/ChecklistContent'
import { ChecklistContentDisplay } from './ChecklistComponents/ChecklistContentDisplay/ChecklistContentDisplay'

export const Checklists = (): JSX.Element => {
  const [currentChecklist, setCurrentChecklist] = React.useState<number>(0)
  // need some way to deal with completions, probably a state in the global state

  const handleChecklistClick = (index: number): void => {
    setCurrentChecklist(index)
  }

  return (
    <div className="checklist-container">
      <ChecklistHeader />
      <div className="checklist-content">
        <ChecklistSelector
          completed={false}
          checklist={checklistContent}
          activeChecklist={currentChecklist}
          onClick={handleChecklistClick}
        />

        <ChecklistContentDisplay
          handleComplete={() => {}}
          currentChecklist={currentChecklist}
          checklist={checklistContent}
        />
      </div>
    </div>
  )
}
