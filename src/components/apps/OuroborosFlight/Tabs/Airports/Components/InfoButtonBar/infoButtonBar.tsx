import React from 'react'
import './infoButtonBarButton.scss'

type T_InfoButtonBarButtonProps = {
  text: string
  to: number
  state: number
  setState: (state: number) => void
}

export const InfoButtonBarButton: React.FC<T_InfoButtonBarButtonProps> = (
  props: T_InfoButtonBarButtonProps
): JSX.Element => {
  return (
    <div
      onClick={() => {
        props.setState(props.to)
      }}
      className={`info-button-bar-button ${props.state === props.to ? 'info-button-bar-button-active' : ''}`}
    >
      {props.text}
    </div>
  )
}
