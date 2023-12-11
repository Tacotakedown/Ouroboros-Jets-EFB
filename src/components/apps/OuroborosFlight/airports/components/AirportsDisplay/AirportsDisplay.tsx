import React from 'react'
import './AirportsDisplay.scss'

type T_AirportDisplayProps = {
  airport: string
}

export const AirportDisplay: React.FC<T_AirportDisplayProps> = (props: T_AirportDisplayProps): JSX.Element => {
  return (
    <div className="airport-display">
      <div className="airport-display-title">Airport</div>
      <div className="airport-display-airport">{props.airport}</div>
      <div>
        <div>Latest Weather</div>
        <div>Elevation</div>
        <div>Pattern Altitude</div>
        <div>Fuel</div>
        <div>Procedures</div>
      </div>
      <div>
        <div>ATIS</div>
        <div>Clerance</div>
        <div>Ground</div>
        <div>Tower</div>
        <div>Appr & Dep</div>
      </div>
    </div>
  )
}
