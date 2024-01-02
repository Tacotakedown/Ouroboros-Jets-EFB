import React from 'react'
import './procedure.scss'

type T_ProcedureButtonProps = {
  to: number
  text: string
  state: any
  setState: any
}

export const ProcedureButton: React.FC<T_ProcedureButtonProps> = (props: T_ProcedureButtonProps): JSX.Element => {
  const isActive = (): boolean => {
    if (props.state === props.to) {
      return true
    }
    return false
  }
  return (
    <div
      className={`procedure-button ${isActive() ? 'active-proc' : ''}`}
      onClick={() => {
        props.setState(props.to)
      }}
    >
      <div className="procedure-text">
        <div> {props.text}</div>
        <div>&gt;</div>
      </div>
    </div>
  )
}
