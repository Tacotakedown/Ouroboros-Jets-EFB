import React from 'react'
import './runway.scss'

type T_RunwayProps = {
  airport: string
}

export const Runway: React.FC<T_RunwayProps> = (props: T_RunwayProps): JSX.Element => {
  return (
    <div className="runway-wrapper">
      <h1>Runway</h1>
      <p>{props.airport}</p>
    </div>
  )
}
