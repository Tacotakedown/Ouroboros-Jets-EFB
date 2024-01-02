import React from 'react'
import './weather.scss'

type T_WeatherButtonProps = {
  to: number
  text: string
  state: any
  setState: any
}

export const WeatherButton: React.FC<T_WeatherButtonProps> = (props: T_WeatherButtonProps): JSX.Element => {
  const isActive = (): boolean => {
    if (props.state === props.to) {
      return true
    }
    return false
  }
  return (
    <div
      className={`weather-button ${isActive() ? 'active-weather' : ''}`}
      onClick={() => {
        props.setState(props.to)
      }}
    >
      <div className="weather-text">
        <div> {props.text}</div>
        <div>&gt;</div>
      </div>
    </div>
  )
}
