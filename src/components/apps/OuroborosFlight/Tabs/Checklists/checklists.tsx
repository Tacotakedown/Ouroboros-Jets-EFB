import React from 'react'
import { ChecklistHeader } from './ChecklistComponents/ChecklistHeader/ChecklistHeader'
import './Checklists.scss'

export const Checklists = (): JSX.Element => {
  return (
    <div className="checklist-container">
      <ChecklistHeader />
      <div className="checklist-content">sss</div>
    </div>
  )
}
