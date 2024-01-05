import React from 'react'
import {
  type T_ChallengeDetails,
  type T_ChallengeTitleBullets,
  type T_String,
  type T_StringArray
} from '../../ChecklistContent/ChecklistContent'
import './ChecklistItemDisplay.scss'

type T_ChecklistItemDisplayDetailsProps = T_ChallengeDetails | T_ChallengeTitleBullets | T_StringArray | T_String | null

type T_combinedArray = {
  challenge: string
  response: string
}

const ActionIconDetails = (): JSX.Element => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={30} viewBox="0 0 24 24">
      <ellipse fill="white" cx="17" cy="12" rx="5" ry="5" />
      <path fill="white" d="M 5.723 10 H 16.281 V 14 H 5.723 A 2 2 0 0 1 3.723 12 V 12 A 2 2 0 0 1 5.723 10 Z" />
    </svg>
  )
}

const ChecklistItemDisplayDetails: React.FC<{ details: T_ChecklistItemDisplayDetailsProps }> = ({
  details
}): JSX.Element | null => {
  if (details === null) {
    return null
  }

  let combinedArray: T_combinedArray[] = []

  switch (details.type) {
    case 'ChallengeDetails':
      combinedArray = details.detailsChallenge.map((challenge, index) => ({
        challenge: challenge,
        response: details.detailsResponse[index]
      }))
      return (
        <div className="info-dropdown">
          {combinedArray.map((item, index) => {
            return (
              <div className="checklist-item-subchecklist-wrapper" key={index}>
                <div className="checklist-item-subchecklist-chal">{item.challenge}</div>
                <div className="checklist-item-subchecklist-res">
                  <ActionIconDetails /> {' ' + item.response}
                </div>
              </div>
            )
          })}
        </div>
      )

    case 'ChallengeTitleBullets':
      return (
        <div className="info-dropdown">
          <div className="checklist-item-subarray-title">{details.title}</div>
          <ul className="checklist-item-subarray-ul">
            {details.bullets.map((bullet, index) => (
              <li className="checklist-item-subarray-li" key={index}>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      )

    case 'StringArray':
      return (
        <ul className="info-dropdown">
          {details.items.map((item, index) => (
            <li className="checklist-item-subarray-li" key={index}>
              {item}
            </li>
          ))}
        </ul>
      )

    case 'String':
      return <div className="info-dropdown">{details.value}</div>

    default:
      return null // Should never happen, but this code is shit so yn know
  }
}

export default ChecklistItemDisplayDetails
