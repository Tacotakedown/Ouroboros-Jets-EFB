import React from 'react'
import { type IMetar, type ITAF } from 'metar-taf-parser'
import './weather.scss'
import { type T_WeatherReturnTypeMetar, type T_WeatherReturnTypeTaf } from '../avwxApi'
import { MetarProvider } from './METAR/metarProvider'
import { TafProvider } from './TAF/tafProvider'
import { WeatherButton } from './weatherButton'

type T_WeatherProps = {
  airport: string
  source: 'AWC' | 'VATSIM' | 'NONE'
  metar: T_WeatherReturnTypeMetar
  taf: T_WeatherReturnTypeTaf
  parsedMetar: IMetar | undefined
  parsedTaf: ITAF | undefined
  fieldElev: number
}

export const Weather: React.FC<T_WeatherProps> = (props: T_WeatherProps): JSX.Element => {
  const [weatherPage, setWeatherPage] = React.useState<number>(0)
  return (
    <div className="weather-wrapper">
      <div className="weather-buttons-wrapper">
        <div className="weather-buttons-title">Weather</div>
        <WeatherButton to={0} setState={setWeatherPage} state={weatherPage} text="METAR" />
        <WeatherButton to={1} setState={setWeatherPage} state={weatherPage} text="TAF" />
      </div>
      <div className="weather-display">
        {weatherPage === 0 ? (
          <MetarProvider metar={props.metar.raw} parsedMetar={props.parsedMetar} fieldElev={props.fieldElev} />
        ) : (
          <TafProvider taf={props.taf.raw} parsedTaf={props.parsedTaf} />
        )}
      </div>
    </div>
  )
}
