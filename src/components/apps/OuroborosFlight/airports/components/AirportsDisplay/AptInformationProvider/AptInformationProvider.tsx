import React from 'react'
import './AptInformationProvider.scss'

type T_AirportInformationProviderProps = {
  field: string
  content: string
  isWeather?: boolean
}

export const AirportInformationProvider: React.FC<T_AirportInformationProviderProps> = (
  props: T_AirportInformationProviderProps
): JSX.Element => {
  return (
    <div className="airport-information-provider">
      <div className="airport-information-provider-field">{props.field}</div>
      <div className="airport-information-provider-content">{props.content}</div>
    </div>
  )
}
