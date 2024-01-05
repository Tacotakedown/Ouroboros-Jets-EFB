import React from 'react'
import './ChecklistItemDisplay.scss'
import ChecklistItemDisplayDetails from './ChecklistItemDisplayDetails'
import {
  type T_ChallengeDetails,
  type T_ChallengeTitleBullets,
  type T_String,
  type T_StringArray
} from '../../ChecklistContent/ChecklistContent'

type T_ChecklistItemDisplayProps = {
  Challenge: string
  action: string
  performedBy: string
  handleComplete: () => void
  isCaution?: boolean
  isNote?: boolean
  isDivider?: boolean
  details: T_ChallengeDetails | T_ChallengeTitleBullets | T_StringArray | T_String | null
}

export const ActionIcon = (): JSX.Element => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={30} viewBox="0 0 24 24">
      <ellipse fill="white" cx="17" cy="12" rx="5" ry="5" />
      <path fill="white" d="M 5.723 10 H 16.281 V 14 H 5.723 A 2 2 0 0 1 3.723 12 V 12 A 2 2 0 0 1 5.723 10 Z" />
    </svg>
  )
}

type T_DisplayIconProps = {
  width: number
  height: number
  fill: string
  bgFill: string
  stroke: string
  className?: string
  active: boolean
}

const InformationIcon: React.FC<T_DisplayIconProps> = (props: T_DisplayIconProps): JSX.Element => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={props.width}
      height={props.height}
      viewBox="0 0 240 240"
    >
      <rect y={45} rx={20} strokeWidth={10} x={10} width={220} height={150} fill={props.bgFill} stroke={props.stroke} />
      <polygon
        fill="white"
        points="86.9,149 86.9,161.3 39.1,161.3 39.1,149 62.1,149 62.1,116.7 43,116.7 43,104.4 74.4,104.4 
			74.4,149 		"
      />
      <circle fill="white" cx="63" cy="88.2" r="10.1" />
      <path
        transform={`rotate(${props.active ? '90' : '0'} 170 120)`}
        className={props.className}
        fill="white"
        d="M139.1,120V93c0-7.3,7.9-11.8,14.1-8.2l23.4,13.5l23.4,13.5c6.3,3.6,6.3,12.7,0,16.3l-23.4,13.5
		l-23.4,13.5c-6.3,3.6-14.1-0.9-14.1-8.2V120z"
      />
    </svg>
  )
}

const ExpandedChecklistIcon: React.FC<T_DisplayIconProps> = (props: T_DisplayIconProps): JSX.Element => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      x="0px"
      y="0px"
      width={props.width}
      height={props.height}
      viewBox="0 0 240 240"
    >
      <g>
        <g>
          <circle cx={120} cy="120.1" r="110" strokeWidth={10} fill={props.bgFill} stroke={props.stroke} />
        </g>
        <path
          fill={props.fill}
          d="M82.3,120V85.8c0-9.2,10-15,17.9-10.4l29.6,17.1l29.6,17.1c8,4.6,8,16.1,0,20.7l-29.6,17.1
		l-29.6,17.1c-8,4.6-17.9-1.2-17.9-10.4V120z"
        />
      </g>
    </svg>
  )
}

export const ChecklistItemDisplay: React.FC<T_ChecklistItemDisplayProps> = (
  props: T_ChecklistItemDisplayProps
): JSX.Element => {
  const [details, setDetails] = React.useState<boolean>(false)

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
    const getIconType = (): JSX.Element | null => {
      if (props.details === null || props.details === undefined) return null

      switch (props.details.type) {
        case 'ChallengeDetails':
        case 'ChallengeTitleBullets':
        case 'StringArray':
          return (
            <ExpandedChecklistIcon
              width={50}
              height={50}
              fill="white"
              bgFill={details ? 'blue' : 'none'}
              stroke="blue"
              active={details}
              className={details ? 'item-display-dropdown-active' : 'item-display-dropdown-inactive'}
            />
          )
        case 'String':
          return (
            <InformationIcon
              width={70}
              height={60}
              fill="white"
              active={details}
              bgFill={details ? 'blue' : 'none'}
              stroke="blue"
              className={details ? 'item-display-dropdown-active-info' : 'item-display-dropdown-inactive-info'}
            />
          )

        default:
          return null // Should never happen, but this code is shit so yn know
      }
    }

    return (
      <div
        onClick={() => {
          setDetails(!details)
        }}
        className={
          props.details !== null && props.details !== undefined
            ? 'checklist-item-display-hasdetails'
            : 'checklist-item-display'
        }
      >
        <div
          className={
            props.details !== null && props.details !== undefined
              ? 'checklist-item-display-inner-wrapper-details'
              : 'checklist-item-display-inner-wrapper'
          }
        >
          <div className="checklist-item-display-challenge">
            {props.details !== null && props.details !== undefined ? (
              <div className="item-icon-container">{getIconType()}</div>
            ) : (
              <div className="item-icon-container-filler"></div>
            )}
            <div className="text-bounding-box">{props.Challenge}</div>
          </div>
          <div className="checklist-item-display-action">
            <ActionIcon />
            {props.action}
          </div>
          <div className="checklist-item-display-performedBy">{props.performedBy}</div>
        </div>
        {details && <ChecklistItemDisplayDetails details={props.details} />}
      </div>
    )
  }
}
