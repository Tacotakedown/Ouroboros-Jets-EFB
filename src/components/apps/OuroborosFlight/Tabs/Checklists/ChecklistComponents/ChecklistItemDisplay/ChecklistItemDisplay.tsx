import React from 'react'
import './ChecklistItemDisplay.scss'

type T_ChecklistItemDisplayProps = {
  Challenge: string
  action: string
  performedBy: string
  handleComplete: () => void
  isCaution?: boolean
  isNote?: boolean
  isDivider?: boolean
}

export const ChecklistItemDisplay: React.FC<T_ChecklistItemDisplayProps> = (
  props: T_ChecklistItemDisplayProps
): JSX.Element => {
  if (props.isCaution !== null && props.isCaution !== undefined && props.isCaution) {
    return (
      <div className="checklist-item-display">
        <div className="checklist-item-display-caution">CAUTION: {props.Challenge}</div>
      </div>
    )
  } else if (props.isNote !== null && props.isNote !== undefined && props.isNote) {
    return (
      <div className="checklist-item-display">
        <div className="checklist-item-display-note">NOTE: {props.Challenge}</div>
      </div>
    )
  } else if (props.isDivider !== null && props.isDivider !== undefined && props.isDivider) {
    return (
      <div className="checklist-item-display">
        <div className="checklist-item-display-divider">divider </div>
      </div>
    )
  } else {
    return (
      <div className="checklist-item-display">
        <div className="checklist-item-display-challenge">{props.Challenge}</div>
        <div className="checklist-item-display-action">{props.action}</div>
        <div className="checklist-item-display-performedBy">{props.performedBy}</div>
      </div>
    )
  }
}
