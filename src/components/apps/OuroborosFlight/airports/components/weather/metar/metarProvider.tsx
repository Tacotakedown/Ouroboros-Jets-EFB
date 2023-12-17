import React from 'react'
import { type IMetar } from 'metar-taf-parser'
import { getFlightCategory } from '../../../../common/getFlightCategory'
import './metarProvider.scss'

type T_MetarProviderProps = {
  metar: string | undefined | null
  parsedMetar: IMetar | undefined
}

export const MetarProvider: React.FC<T_MetarProviderProps> = (props: T_MetarProviderProps): JSX.Element => {
  if (props.metar === undefined) return <div className="metar-wrapper">Loading...</div>
  if (props.parsedMetar === undefined) return <div className="metar-wrapper">Loading...</div>

  const flightCategory = getFlightCategory(
    {
      type: props.parsedMetar?.clouds[props.parsedMetar.clouds.length - 1]?.type ?? '',
      height: props.parsedMetar?.clouds[props.parsedMetar.clouds.length - 1]?.height ?? 0
    },
    props.parsedMetar?.visibility?.value ?? 999
  )
  const padNumber = (num: number | undefined): string => {
    if (num === undefined) return ''
    return num < 10 ? '0' + num.toString() : num.toString()
  }

  return (
    <div className="metar-wrapper">
      <div className="metar-header">
        <div className="flight-cat-group">
          <div className="flight-cat-bubble" style={{ backgroundColor: flightCategory.color }} />
          <div style={{ color: flightCategory.color }}>{flightCategory.flightCategory}</div>
        </div>

        <div>
          {props.parsedMetar.day} at {padNumber(props.parsedMetar.hour)}:{padNumber(props.parsedMetar.minute)}z
        </div>
      </div>
      <div className="metar-raw" style={{ color: flightCategory.color }}>
        {props.metar}
      </div>
      <div>
        Wind: {props.parsedMetar.wind?.degrees}° at {props.parsedMetar.wind?.speed} knots
      </div>
      <div>Visibility: {props.parsedMetar.visibility?.value} sm</div>
      <div>Temperature: {props.parsedMetar.temperature}°C</div>
      <div>Dewpoint: {props.parsedMetar.dewPoint}°C</div>
      <div>
        Altimeter: {props.parsedMetar.altimeter?.value} {props.parsedMetar.altimeter?.unit}
      </div>
    </div>
  )
}
