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

const ActionIcon = (): JSX.Element => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={30} viewBox="0 0 24 24">
      <ellipse
        fill="white"
        cx="17"
        cy="12"
        rx="4.988"
        ry="4.988"
        transform="matrix(1, 0, 0, 1, 0, 1.7763568394002505e-15)"
      />
      <path
        fill="white"
        d="M 5.723 10 H 16.281 V 14 H 5.723 A 2 2 0 0 1 3.723 12 V 12 A 2 2 0 0 1 5.723 10 Z"
        transform="matrix(1, 0, 0, 1, 0, 1.7763568394002505e-15)"
      />
    </svg>
  )
}

export const ChecklistItemDisplay: React.FC<T_ChecklistItemDisplayProps> = (
  props: T_ChecklistItemDisplayProps
): JSX.Element => {
  if (props.isCaution !== null && props.isCaution !== undefined && props.isCaution) {
    return (
      <div className="checklist-item-display-caution">
        <u>CAUTION:</u> {props.Challenge}
      </div>
    )
  } else if (props.isNote !== null && props.isNote !== undefined && props.isNote) {
    return (
      <div className="checklist-item-display-note">
        <u>NOTE:</u> {props.Challenge}
      </div>
    )
  } else if (props.isDivider !== null && props.isDivider !== undefined && props.isDivider) {
    return (
      <div className="checklist-item-display">
        <div className="checklist-item-display-divider"></div>
      </div>
    )
  } else {
    return (
      <div className="checklist-item-display">
        <div className="checklist-item-display-challenge">{props.Challenge}</div>
        <div className="checklist-item-display-action">
          <ActionIcon />
          {props.action}
        </div>
        <div className="checklist-item-display-performedBy">{props.performedBy}</div>
      </div>
    )
  }
}
