import React from 'react'
import { InfoButtonBarButton } from './infoButtonBar'
import './infoButtonBarButton.scss'

type T_InfoButtonBarProps = {
  children?: JSX.Element
  state: number
  setState: (state: number) => void
}

export const InfoButtonBar: React.FC<T_InfoButtonBarProps> = (props: T_InfoButtonBarProps): JSX.Element => {
  return (
    <div className="airports-button-bar">
      <InfoButtonBarButton state={props.state} setState={props.setState} text="Info" to={0} />
      <InfoButtonBarButton state={props.state} setState={props.setState} text="Weather" to={1} />
      <InfoButtonBarButton state={props.state} setState={props.setState} text="Runway" to={2} />
      <InfoButtonBarButton state={props.state} setState={props.setState} text="Procedure" to={3} />
      {/* <InfoButtonBarButton state={props.state} setState={props.setState} text="NOTAM" to={4} /> */}
    </div>
  )
}
