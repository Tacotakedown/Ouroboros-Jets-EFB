import React from 'react'
import './AptInformationProvider.scss'

type T_AirportInformationProviderProps = {
  field: string
  content: string
  isWeather?: boolean
  color?: string
  metarRaw?: string
  backgroundColor?: string
}

export const AirportInformationProvider: React.FC<T_AirportInformationProviderProps> = (
  props: T_AirportInformationProviderProps
): JSX.Element => {
  if (props.isWeather == null || !props.isWeather) {
    return (
      <div className="airport-information-provider">
        <div className="airport-information-provider-field">{props.field}</div>
        <div className="airport-information-provider-content" style={{ color: props.color ?? '' }}>
          {props.content}
        </div>
      </div>
    )
  } else {
    return (
      <div className="airport-information-provider-weather">
        <div className="airport-information-provider-field-weather">{props.field}</div>

        <div
          className="airport-information-provider-content-weather"
          style={{ color: props.color ?? '', backgroundColor: props.backgroundColor ?? '' }}
        >
          {props.content}
        </div>
        <div
          className="airport-information-provider-metar"
          style={{ color: props.color ?? '', backgroundColor: props.backgroundColor ?? '' }}
        >
          {props.metarRaw}
        </div>
      </div>
    )
  }
}
