import React from 'react'
import { AppContext } from '../../../appRouter/appRouter'
import { ChecklistHeader } from './ChecklistComponents/ChecklistHeader/ChecklistHeader'
import './Checklists.scss'
import { ChecklistSelector } from './ChecklistComponents/ChecklistSelector/ChecklistSelector'
import { checklistContent } from './ChecklistContent/ChecklistContent'
import { ChecklistContentDisplay } from './ChecklistComponents/ChecklistContentDisplay/ChecklistContentDisplay'

export const Checklists = (): JSX.Element => {
  const { state, updateState } = React.useContext(AppContext)

  const updateCurrentChecklist = (current: number): void => {
    updateState({
      ...state,
      state: {
        ouroborosFlight: {
          page: state?.ouroborosFlight.page,
          currentChart: state?.ouroborosFlight.currentChart,
          currentAirport: state?.ouroborosFlight.currentAirport,
          favorites: state?.ouroborosFlight.favorites,
          darkMode: state?.ouroborosFlight.darkMode,
          scratchpads: state?.ouroborosFlight.scratchpads,
          scratchpadSvg: state?.ouroborosFlight.scratchpadSvg
        },
        checklists: {
          currentChecklist: current,
          completedChecklists: state?.checklists.completedChecklists
        }
      }
    })
  }

  const updateCompletedChecklists = (completedChecklists: boolean[]): void => {
    updateState({
      ...state,
      state: {
        ouroborosFlight: {
          page: state?.ouroborosFlight.page,
          currentChart: state?.ouroborosFlight.currentChart,
          currentAirport: state?.ouroborosFlight.currentAirport,
          favorites: state?.ouroborosFlight.favorites,
          darkMode: state?.ouroborosFlight.darkMode,
          scratchpads: state?.ouroborosFlight.scratchpads,
          scratchpadSvg: state?.ouroborosFlight.scratchpadSvg
        },
        checklists: {
          currentChecklist: state?.checklists.currentChecklist,
          completedChecklists: completedChecklists
        }
      }
    })
  }

  const handleComplete = (index: number, set: boolean): void => {
    if (state?.checklists.completedChecklists === undefined) return
    const newCompletedChecklists = [...(state?.checklists.completedChecklists ?? [])]
    newCompletedChecklists[index] = set
    updateCompletedChecklists(newCompletedChecklists)
  }

  const handleChecklistClick = (index: number): void => {
    updateCurrentChecklist(index)
  }

  const handleResetAllChecklists = (): void => {
    const newCompletedChecklists = [...(state?.checklists.completedChecklists ?? [])]
    newCompletedChecklists.fill(false)
    updateCompletedChecklists(newCompletedChecklists)
  }

  return (
    <div className="checklist-container">
      <ChecklistHeader />
      <div className="checklist-content">
        <ChecklistSelector
          resetAllChecklists={handleResetAllChecklists}
          completedChecklists={state?.checklists.completedChecklists ?? []}
          checklist={checklistContent}
          activeChecklist={state?.checklists.currentChecklist ?? 0}
          onClick={handleChecklistClick}
        />

        <ChecklistContentDisplay
          handleComplete={handleComplete}
          currentChecklist={state?.checklists.currentChecklist ?? 0}
          checklist={checklistContent}
          completedChecklists={state?.checklists.completedChecklists ?? []}
        />
      </div>
    </div>
  )
}
