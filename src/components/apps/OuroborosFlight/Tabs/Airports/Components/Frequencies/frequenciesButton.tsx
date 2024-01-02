import React from 'react'
import { type E_FrequencyTypes } from './enums'
import './frequencies.scss'

type T_FrequenciesButtonProps = {
  to: E_FrequencyTypes
  text: string
  state: any
  setState: any
}

export const FrequenciesButton: React.FC<T_FrequenciesButtonProps> = (props: T_FrequenciesButtonProps): JSX.Element => {
  const isActive = (): boolean => {
    if (props.state === props.to) {
      return true
    }
    return false
  }
  return (
    <div
      className={`frequency-button ${isActive() ? 'active-freq' : ''}`}
      onClick={() => {
        props.setState(props.to)
      }}
    >
      <div className="frequency-text">
        <div> {props.text}</div>
        <div>&gt;</div>
      </div>
    </div>
  )
}
